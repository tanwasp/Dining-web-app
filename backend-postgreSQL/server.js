import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"
import helmet from "helmet"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))


app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
      },
    })
  );
  

export default app


