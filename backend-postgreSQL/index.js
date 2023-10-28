import express from 'express';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Database connection test
testDbConnection();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});