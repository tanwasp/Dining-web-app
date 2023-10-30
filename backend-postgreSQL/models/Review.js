// import { DataTypes } from 'sequelize';
// import { sequelize } from '../config/db.js';
// import Restaurant from './Restaurant.js';

// const Review = sequelize.define('Review', {
//   reviewid: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   userid: {
//     type: DataTypes.INTEGER,
//     references: {
//       key: 'userid'
//     }
//   },
//   // restaurantid: {
//   //   type: DataTypes.INTEGER,
//   //   references: {
//   //     model: Restaurant,
//   //     key: 'restaurantid'
//   //   }
//   // },
//   rating: DataTypes.FLOAT,
//   date: DataTypes.DATE,
//   comment: DataTypes.TEXT,
//   price: DataTypes.INTEGER
// });


// export default Review;