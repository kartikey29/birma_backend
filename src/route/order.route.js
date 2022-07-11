const orderRoute = require("express").Router();
const orderController = require("../controller/order.controller");
const { verifyToken } = require('../middleware/middleware');

orderRoute.get("/getOrderById/:_id", orderController.getOrderById);

orderRoute.post("/addOrder", verifyToken, orderController.addOrder);

orderRoute.get('/getAllOrders', orderController.getAllOrders);

orderRoute.patch("/editOrder/:_id", orderController.editOrder);

orderRoute.delete("/deleteOrder/:_id", orderController.deleteOrder);

module.exports = orderRoute;
