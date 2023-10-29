import sequelize from '../config/db.js';
import Restaurant from './Restaurant.js';
import Review from './Review.js';

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

const db = {
  sequelize,
  Sequelize,
  Restaurant,
  Review
};

export default db;
