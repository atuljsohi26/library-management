import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
