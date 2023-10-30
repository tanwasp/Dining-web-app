import dotenv from 'dotenv';
import { sequelize, testDbConnection } from './config/db.js';
import app from './server.js';

dotenv.config();

const port = process.env.PORT || 8000;

// Database connection test
testDbConnection();

const startServer = async () => {
  
  try {
    await sequelize.sync();
    console.log('Database synced successfully.');

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });

  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();

