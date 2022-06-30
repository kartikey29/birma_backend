const orderRoute = require("express").Router();

orderRoute.get("/getOrderById?id=");

orderRoute.post("/addOrder");

orderRoute.patch("/editOrder");

orderRoute.delete("/deleteOrder");

module.exports = orderRoute;
