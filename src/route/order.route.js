const orderRoute = require("express").Router();
const orderController = require("../controller/order.controller");
const { verifyToken } = require('../middleware/middleware');

orderRoute.get("/getOrderStatus", verifyToken, orderController.getOrderStatus);

orderRoute.post("/addOrder", verifyToken, orderController.addOrder);


orderRoute.get('/getAllOrders', orderController.getAllOrders)


orderRoute.patch("/editOrder/:_id", orderController.editOrder);

orderRoute.delete("/deleteOrder/:_id", orderController.deleteOrder);

orderRoute.patch("/cancelOrder/:_id", verifyToken, orderController.cancelOrder);

module.exports = orderRoute;
