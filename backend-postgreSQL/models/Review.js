import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Review = sequelize.define('Review', {
  reviewid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userid: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'userid'
    }
  },

  restaurantid: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: 'restaurantid'
    }
  },

  rating: {
    type: DataTypes.FLOAT,
    // Consider adding validation for range
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  
  comment: DataTypes.TEXT,
  price: DataTypes.INTEGER
});

export default Review;