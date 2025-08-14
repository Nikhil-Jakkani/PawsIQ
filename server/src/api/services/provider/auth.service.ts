import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { db } from '../../../config/db.js';
import { ApiError } from '../../utils/ApiError.js';
import { tokenService } from '../user/token.service.js';
import { tokenTypes } from '../../../config/tokens.js';

const login = async (email: string, password: string) => {
  const { data: provider, error } = await db
    .from('PIQ_Service_Provider')
    .select('*')
    .eq('provider_email', email)
    .single();

  if (error || !provider) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  const isPasswordMatch = await bcrypt.compare(password, provider.provider_password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  if (provider.provider_status !== 'active') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Your account is not active. Please contact support.');
  }

  const tokens = await tokenService.generateAuthTokens(provider.provider_id, 'provider');
  return { provider, tokens };
};

const register = async (providerBody: any) => {
  const { data: existingProvider } = await db
    .from('PIQ_Service_Provider')
    .select('provider_email')
    .eq('provider_email', providerBody.provider_email)
    .single();

  if (existingProvider) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const hashedPassword = await bcrypt.hash(providerBody.provider_password, 10);
  const newProviderData = {
    ...providerBody,
    provider_password: hashedPassword,
    provider_status: 'active',
  };

  const { data: newProvider, error } = await db
    .from('PIQ_Service_Provider')
    .insert(newProviderData)
    .select()
    .single();

  if (error || !newProvider) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Could not create provider');
  }

  return newProvider;
};

export const providerAuthService = {
  login,
  register,
};
