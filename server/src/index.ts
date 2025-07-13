import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
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
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
