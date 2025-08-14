import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(4000),
    SUPABASE_URL: Joi.string().required().description('Supabase project URL'),
    SUPABASE_ANON_KEY: Joi.string().required().description('Supabase anonymous key'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    GEMINI_API_KEY: Joi.string().required().description('Gemini API Key'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  supabaseUrl: envVars.SUPABASE_URL,
  supabaseAnonKey: envVars.SUPABASE_ANON_KEY,
  jwtSecret: envVars.JWT_SECRET,
  geminiApiKey: envVars.GEMINI_API_KEY,
};
