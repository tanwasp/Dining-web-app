import db from "../config/firebaseConfig.js";

export default class RestaurantsDAO {

  static restaurants = db.collection("restaurants");

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
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

    // Note: For pagination, you would have to implement startAt and endAt using Firestore document snapshots

    let restaurantsList;
    try {
      restaurantsList = await query.limit(restaurantsPerPage).get();
    } catch (e) {
      console.error(`Unable to fetch restaurants, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    let totalNumRestaurants;
    try {
      totalNumRestaurants = (await this.restaurants.get()).size;
    } catch (e) {
      console.error(`Unable to count restaurants, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }

    return { restaurantsList: restaurantsList.docs.map(doc => doc.data()), totalNumRestaurants };
  }

  static async getRestaurantByID(id) {
    try {
      const restaurantDoc = await this.restaurants.doc(id).get();
      const restaurantData = restaurantDoc.data();
      
      // Fetching reviews (Firestore does not have $lookup, so we'll do this in two steps)
      const reviews = await db.collection('reviews').where('restaurant_id', '==', id).orderBy('date', 'desc').get();

      restaurantData.reviews = reviews.docs.map(doc => doc.data());

      return restaurantData;
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      const snapshot = await this.restaurants.get();
      const allCuisines = snapshot.docs.map(doc => doc.data().cuisine);
      cuisines = [...new Set(allCuisines)]; // deduplicate
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}
