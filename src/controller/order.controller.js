const Order = require("../model/order.Model");

//create an order
const addOrder = async (req, res, next) => {
  try {
    const insertData = await Order.create(req.body);
    return res.status(200).json({
      message: "Order created successfully",
      data: insertData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server not responding",
      data: [error.message],
    });
  }
};

//get an order by unique ID
const getOrderById = async (req, res, next) => {
  try {
    const _id = req.params;
    const orderData = await Order.findById(_id);
    if (!orderData) {
      throw { message: "Order doesnt exist" };
    }
    return res.status(200).json({
      message: "Order fetched successfully",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

//update order of the user
const editOrder = async (req, res, next) => {
  try {
    const editOrderById = await Order.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });
    if (!editOrderById) {
      throw { message: "order doesn't exist" };
    }
    return res.status(200).json({
      message: "Order updated successfully",
      data: editOrderById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server not responding",
      data: error.message,
    });
  }
};

//delete order of the user
const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrderById = await Order.findByIdAndDelete(req.params);
    if (!deleteOrderById) {
      throw { message: "Order doesn;t exist" };
    }
    return res.status(200).json({
      message: "Order deleted successfully",
      data: deleteOrderById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server is not responding",
      data: error.message,
    });
  }
};

module.exports = { getOrderById, addOrder, editOrder, deleteOrder };
