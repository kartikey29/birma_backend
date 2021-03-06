/**========================================================================
 * *                                INFO
 *   # Birma-Backend APIs
 *   # Git-Repo : https://github.com/kartikey29/birma_backend/tree/master
 * 	 # Start Server : npm run dev
 *
 *========================================================================**/

/**======================
 *!    Importing Files
 *========================**/
const express = require("express");
const app = express();
const cors = require("cors");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

// Environment Path
require("dotenv").config({ path: "./config.env" });

// Routes
const userRoute = require("./src/route/user.route");
const productRoute = require("./src/route/product.route");
const orderRoute = require('./src/route/order.route');
const registerRoute=require('./src/route/register.route');

// Environment Variable
const port = process.env.PORT;

// Database Connection
require("./src/db/connection");

// Middleware
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Calling Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/register",registerRoute);


//Restrict Invalid Routes
app.get("*", (req, res) => {
  console.log("Invalid Page Request");
  res
    .send("<h1><i><strong> ( 404 ) Page Not Found , Invalid page request")
    .status(400);
});

/**========================================================================
 *                           Listening Port at 5000
 *========================================================================**/
app.listen(port, () => {
  console.log(`server is starting on port ${port}`);
});
