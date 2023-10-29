import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Review extends Model {}
Review.init({
  // ... fields
}, {
  sequelize,
  modelName: 'review'
});

export default Review;
