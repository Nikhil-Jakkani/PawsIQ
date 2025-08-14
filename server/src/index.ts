import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import config from './config/config.js';

const app: Express = express();
const port = config.port;

app.use(cors());
// Log incoming request headers for debugging
app.use((req, res, next) => {
  if (req.method === 'POST' && req.url === '/api/v1/user/ai/suggestions') {
  }
  next();
});

app.use(express.json());

import apiRoutes from './api/routes/index.js';

app.get('/', (req: Request, res: Response) => {
  res.send('PawsIQ Backend Server is running!');
});

app.use('/api/v1', apiRoutes);

// Error handling
import { errorConverter, errorHandler } from './api/middlewares/error.js';
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`PawsIQ Backend listening on port ${port}`);
});
