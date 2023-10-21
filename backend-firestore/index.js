import app from "./server.js";
import dotenv from "dotenv";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import db from "./config/firebaseConfig.js";

dotenv.config();

// Injecting db to DAOs
// RestaurantsDAO.injectDB(db);
// ReviewsDAO.injectDB(db);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

