import { supabase } from '../../../config/supabase.js';
import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';

const createUser = async (userData: any) => {
  const { email, password, name, phone, address } = userData;

  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, name, phone, address }])
    .select();

  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not create user');
  }

  return data[0];
};

const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not fetch users');
  }
  return data;
};

const getUserById = async (id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error || !data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return data;
};

const updateUserById = async (id: string, updateBody: any) => {
  const user = await getUserById(id);

  const { data, error } = await supabase
    .from('users')
    .update(updateBody)
    .eq('id', id)
    .select();

  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not update user');
  }

  return data[0];
};

const deleteUserById = async (id: string) => {
  await getUserById(id);
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not delete user');
  }
  return { message: 'User deleted successfully' };
};

export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
