import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Database connection using Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'  //,
    // logging: false
});

// Test the database connection

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }