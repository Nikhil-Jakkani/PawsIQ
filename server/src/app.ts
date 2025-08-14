import express from 'express';
import cors from 'cors';
import apiRoutes from './api/routes/index.js';
import { errorConverter, errorHandler } from './api/middlewares/error.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('PawsIQ Backend Server is running!');
});

app.use('/api/v1', apiRoutes);

// Error handling must come after routes
app.use(errorConverter);
app.use(errorHandler);

export default app;
