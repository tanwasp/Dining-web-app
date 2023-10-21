# Dining-web-app

This is a backend of a restaurant search and review web app. This repository contains two folders:
* __backend_mongoDB__: 

## Technologies
* __Languages__: JavaScript with Node and Express
* __Database__: Changing from MongoDB to Firestore

## How to use
Currently, only the mongoDB version of the backend server is working. 
1. Clone the repository
2. Set up a mongoDB restaurant dataset with the following format/ fields
3. Run "npm install"
4. Run "node index.js"
5. Navigate to http://localhost:5000/api/v1/restaurants

### HTTP requests and URLs
default - /api/v1/restaurants
#### Searching/ Checking out Restaurants
- **/** 
    - type: get
    - this searches for restaurants based on filters: 
        - name: returns restaurants that contain name in the restaurant name
        - zipcode
        - cuisine
    - calls RestaurantCtrl.apiGetRestaurants
- **/id/:id**
    - type: get
    - gets the reviews of a restaurant
    - calls RestaurantCtrl.apiGetRestaurantById
- **/cuisines**
    - type: get
    - this gets a list of the distinct cuisines available 
    - calls RestaurantCtrl.apiGetRestaurantCuisines

- **/review**
    - type: post
        - posts a review for a restaurant
        - body takes an object with the fields as shown in the example below
        - ```
            {
             "restaurant_id": "5eb3d668b31de5d588f4292a",
            "text": "Always love the food here",
            "user_id": "6969",
            "name": "Messi"
            }
            ```
        - adds a document to the reviews collection (which it creates if it doesn't exist) 
    - type: put
        - edits a review for a restaurant
        - body takes an object with the fields as shown in the example below
        - ```
            {
             "review_id": "2345eb3d668b31de5d588f4292a",
            "text": "The worst food in the world",
            "user_id": "6969",
            "name": "Messi"
            }
            ```
    - type: delete
        - deletes a review for a restaurant
        - url request takes id query for review id
            - example: http://localhost:5000/api/v1/restaurants/review?id=652c5a548db04b6b4d38f97f
        - body takes an object with the fields as shown in the example below
        - ```
            {
            "user_id": "6969",
            "name": "Messi" (optional)
            }
            ```

### Methods and function calls



