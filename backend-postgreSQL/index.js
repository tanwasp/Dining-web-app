import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import RestaurantsDAO from './dao/restaurantsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Database connection using Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

// Test the database connection
sequelize.authenticate()
    .then(async () => {
        console.log('Database connection established successfully.');

        await RestaurantsDAO.injectDB(sequelize);
        await ReviewsDAO.injectDB(sequelize);

        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });
