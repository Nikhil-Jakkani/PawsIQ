import bcryptjs from 'bcryptjs';
import { db } from '../../../config/db.js';
import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';

export const userService = {
  /**
   * Get user by ID
   */
  getUserById: async (userId: number) => {
    const { data: user, error } = await db
      .from('PIQ_User')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Remove sensitive data
    const { user_password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  /**
   * Get user by email
   */
  getUserByEmail: async (email: string) => {
    const { data: user, error } = await db
      .from('PIQ_User')
      .select('*')
      .eq('user_email_id', email.toLowerCase())
      .single();

    if (error) return null;
    return user;
  },

  /**
   * Update user by ID
   */
  updateUserById: async (userId: number, updateBody: any) => {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Check if email is already taken
    if (updateBody.user_email_id && (await userService.getUserByEmail(updateBody.user_email_id))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    // Hash password if it's being updated
    if (updateBody.user_password) {
      updateBody.user_password = await bcryptjs.hash(updateBody.user_password, 10);
    }

    // Update user
    const { data: updatedUser, error } = await db
      .from('PIQ_User')
      .update({
        ...updateBody,
        last_updated_dtm: new Date(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error updating user');
    }

    // Remove sensitive data
    const { user_password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  /**
   * Delete user by ID
   */
  deleteUserById: async (userId: number) => {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Soft delete by updating status
    const { error } = await db
      .from('PIQ_User')
      .update({ user_status: 'deleted', last_updated_dtm: new Date() })
      .eq('user_id', userId);

    if (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error deleting user');
    }
  },

  /**
   * Query users with pagination
   */
  queryUsers: async (filter: any, options: any) => {
    const { page = 1, limit = 10, sortBy, sortType = 'asc' } = options;
    const offset = (page - 1) * limit;
    
    let query = db
      .from('PIQ_User')
      .select('user_id, user_full_name, user_email_id, user_phone_number, created_at, last_updated_dtm, user_status')
      .neq('user_status', 'deleted');

    // Apply filters
    if (filter.user_full_name) {
      query = query.ilike('user_full_name', `%${filter.user_full_name}%`);
    }
    if (filter.user_email_id) {
      query = query.ilike('user_email_id', `%${filter.user_email_id}%`);
    }
    if (filter.user_status) {
      query = query.eq('user_status', filter.user_status);
    }

    // Apply sorting
    if (sortBy) {
      query = query.order(sortBy, { ascending: sortType === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: users, error, count } = await query;

    if (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching users');
    }

    return {
      results: users,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      totalResults: count || 0,
    };
  },
};
