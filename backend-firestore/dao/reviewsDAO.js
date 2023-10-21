import db from "../config/firebaseConfig.js";

export default class ReviewsDAO {
  static reviews = db.collection("reviews"); 

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: restaurantId
      };

      const docRef = await this.reviews.add(reviewDoc);
      return docRef.id;  // This will return the newly created document's ID
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const reviewRef = this.reviews.doc(reviewId);

      const reviewDoc = await reviewRef.get();
      if (!reviewDoc.exists) {
        console.error(`Review doesn't exist.`);
        return { error: "Review doesn't exist" };
      }

      if (reviewDoc.data().user_id !== userId) {
        console.error(`User doesn't have permission to update.`);
        return { error: "User doesn't have permission to update" };
      }

      await reviewRef.update({ text: text, date: date });
      return { status: 'success' };

    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const reviewRef = this.reviews.doc(reviewId);
      const reviewDoc = await reviewRef.get();

      if (!reviewDoc.exists) {
        console.error(`Review doesn't exist.`);
        return { error: "Review doesn't exist" };
      }

      if (reviewDoc.data().user_id !== userId) {
        console.error(`User doesn't have permission to delete.`);
        return { error: "User doesn't have permission to delete" };
      }

      await reviewRef.delete();
      return { status: 'success' };

    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
