import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Restaurant = sequelize.define('Restaurant', {
  restaurantid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  foreignresid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coordinates: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true
  },
  stars: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  priceRange: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  tableName: 'restaurants',
  timestamps: false  // Assuming you don't have created_at and updated_at columns
});

export default Restaurant;