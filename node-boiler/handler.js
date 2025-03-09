import serverless from 'serverless-http';
import app from './src/app.js';

// Wrap Express app for Serverless
export const handler = serverless(app);
