import { supabase } from '@config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';

const login = async (email: string, password: string): Promise<any> => {
  const { data, error: supabaseError } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .single(); // Use .single() to get one record or null

  if (supabaseError || !data) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const admin = data;
  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  // Return user and token, as expected by the frontend
  const { password: _, ...userWithoutPassword } = admin;
  return { user: userWithoutPassword, token };
};

export const authService = {
  login,
};
