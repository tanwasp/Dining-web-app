import pool from '../config/db.js';


export default class ReviewsDAO {
  static async addReview(restaurantId, user, review, date) {
    try {
      const query = `
        INSERT INTO reviews (name, user_id, date, text, restaurant_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [user.name, user._id, date, review, restaurantId];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const query = `
        UPDATE reviews
        SET text = $1, date = $2
        WHERE id = $3 AND user_id = $4
        RETURNING *;
      `;
      const values = [text, date, reviewId, userId];
      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const query = `
        DELETE FROM reviews
        WHERE id = $1 AND user_id = $2;
      `;
      const values = [reviewId, userId];
      const result = await pool.query(query, values);
      return result.rowCount;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
