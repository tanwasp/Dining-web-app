import pool from '../config/db.js';

export default class RestaurantsDAO {
  
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query = 'SELECT * FROM restaurants';
    const values = [];

    if (filters) {
      if ("name" in filters) {
        query += ' WHERE name LIKE $1';
        values.push(`%${filters["name"]}%`);
      } else if ("cuisine" in filters) {
        query += ' WHERE cuisine = $1';
        values.push(filters["cuisine"]);
      } else if ("zipcode" in filters) {
        query += ' WHERE postalCode = $1';
        values.push(filters["zipcode"]);
      }
    }

    query += ' LIMIT $2 OFFSET $3';
    values.push(restaurantsPerPage, restaurantsPerPage * page);

    try {
      const { rows } = await pool.query(query, values);
      const countQuery = 'SELECT COUNT(*) FROM restaurants';
      const { rows: countRows } = await pool.query(countQuery);
      const totalNumRestaurants = parseInt(countRows[0].count, 10);
      return { restaurantsList: rows, totalNumRestaurants };
    } catch (e) {
      console.error(`Unable to get restaurants, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantByID(id) {
    try {
      const query = `
        SELECT r.*, array_agg(rv.*) as reviews
        FROM restaurants r
        LEFT JOIN reviews rv ON r.restaurantid = rv.restaurant_id
        WHERE r.restaurantid = $1
        GROUP BY r.restaurantid;
      `;
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }

  static async getCuisines() {
    try {
      const query = 'SELECT DISTINCT cuisine FROM restaurants';
      const { rows } = await pool.query(query);
      return rows.map(row => row.cuisine);
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return [];
    }
  }
}
