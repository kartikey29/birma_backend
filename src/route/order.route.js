const orderRoute = require("express").Router();
const orderController = require("../controller/order.controller");

orderRoute.get("/getOrderById/:_id", orderController.getOrderById);

orderRoute.post("/addOrder", orderController.addOrder);

orderRoute.patch("/editOrder/:_id", orderController.editOrder);

orderRoute.delete("/deleteOrder/:_id", orderController.deleteOrder);

module.exports = orderRoute;
