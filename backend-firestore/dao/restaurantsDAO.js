import db from "../config/firebaseConfig.js";

export default class RestaurantsDAO {

  static restaurants = db.collection("restaurants");

  static async getRestaurants({
    filters = null,
    restaurantsPerPage = 20,
    lastDocumentID = null
  } = {}) {
    let query = this.restaurants;

    if (filters) {
      if ("name" in filters) {
        query = query.where('name', '==', filters["name"]);
      } else if ("cuisine" in filters) {
        query = query.where('cuisine', '==', filters["cuisine"]);
      } else if ("zipcode" in filters) {
        query = query.where('address.zipcode', '==', filters["zipcode"]);
      }
    }

    // For pagination
    if (lastDocumentID) {
      const lastDocumentSnapshot = await this.restaurants.doc(lastDocumentID).get();
      query = query.startAfter(lastDocumentSnapshot);
    }

    let restaurantsList = [];
    try {
      const snapshot = await query.limit(restaurantsPerPage).get();
      restaurantsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (e) {
      console.error(`Unable to fetch restaurants, ${e}`)
    }

    return { restaurantsList };
  }

  static async getRestaurantByID(id) {
    try {
      const restaurantDoc = await this.restaurants.doc(id).get();
      if (!restaurantDoc.exists) return null;
      const restaurantData = restaurantDoc.data();
      
      // Fetching reviews
      const reviews = await db.collection('reviews').where('restaurant_id', '==', id).orderBy('date', 'desc').get();
      restaurantData.reviews = reviews.docs.map(doc => doc.data());

      return restaurantData;
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e;
    }
  }

  static async getCuisines() {
    // The method here is still not very optimal as it reads all restaurants. 
    // But deduplication is done on the server side to reduce network traffic.
    let cuisines = [];
    try {
      const snapshot = await this.restaurants.select("cuisine").get(); // use select to fetch only cuisine field
      const allCuisines = snapshot.docs.map(doc => doc.data().cuisine);
      cuisines = [...new Set(allCuisines)]; // deduplicate
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
