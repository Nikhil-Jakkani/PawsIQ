import serverless from 'serverless-http';
import app from '../../../dist/server/app.js';

export const config = { runtime: 'nodejs20.x' };

export default serverless(app);
