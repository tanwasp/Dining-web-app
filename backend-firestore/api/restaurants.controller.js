import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {

  static async apiGetRestaurants(req, res, next) {
    
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    // Assuming lastDocumentID is passed from the frontend when the user wants to paginate
    let lastDocumentID = req.query.lastDocumentID || null;

    const restaurantsList = await RestaurantsDAO.getRestaurants({
      filters,
      page,
      restaurantsPerPage,
      lastDocumentID
    })

    // No need to send total results since we're not counting all documents
    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
    }
    res.json(response)
  }



    



  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {}
      let restaurant = await RestaurantsDAO.getRestaurantByID(id)
      if (!restaurant) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(restaurant)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines()
      res.json(cuisines)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}