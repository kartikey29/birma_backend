const Order = require("../model/order.Model");
const User = require("../model/user.Model");

const getOptions = (page) => {
  const options = {
    page: page,
    limit: 20,
    sort: {
      createdAt: -1,
    },
    populate: [
      {
        path: "delivery",
      },
      {
        path: "address",
      },
      {
        path: "products.productId",
        select: "OurPrice MaximumRetailPrice TITLE",
      },
    ],
  };
  return options;
};

//create an order
const addOrder = async (req, res, next) => {
  try {
    const { role_Id } = req.user;
    // console.log(role_Id);

    if (role_Id != "1") {
      throw { message: "Order created by someone whose not client" };
    }
    const { _id } = req.user;
    const clientId = _id;
    req.body.clientID = clientId; //inserting user _id into clientId

    const insertData = await Order.create(req.body);

    return res.status(200).json({
      message: "Order created successfully",
      data: insertData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server not responding",
      data: error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { _id, role_Id } = req.user;
    console.log(_id);
    const { page } = req.query;
    if (role_Id != 1) {
      throw { message: "customer should request " };
    }
    Id;

    const options = getOptions(page);

    const orderData = await Order.paginate({ clientID: _id }, options);

    return res.send(orderData);
  } catch (e) {
    return res.status(504).send(e);
  }
};

//get order staus by clientID
const getOrderStatus = async (req, res, next) => {
  try {
    const orderData = await Order.findById(req.body.orderId);
    if (!orderData) {
      throw { message: "order doesn't exist" };
    }
    return res.send({ status: orderData.status });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addDelivery = async (req, res, next) => {
  try {
    const { _id, role_Id } = req.user;
    const { orderId } = req.body;
    if (role_Id !== "1") {
      throw { message: "request sender must be customer" };
    }
    const order = await Order.findById(orderId);
    const clientID = order.clientID.toString();
    const userID = _id.toString();
    if (clientID != userID) {
      throw { message: "jwt id does not match order clientID" };
    }
    const foundDeliveryMan = await User.findOne({ role_Id: 2 });

    order.delivery = foundDeliveryMan._id;

    await order.save();
    await foundDeliveryMan.save();

    return res.send({
      message: "delivery man assigned",
      foundDeliveryMan,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

//update order of the user
// const editOrder = async (req, res, next) => {
//   try {
//     const editOrderById = await Order.findByIdAndUpdate(req.params, req.body, {
//       new: true,
//     });
//     if (!editOrderById) {
//       throw { message: "order doesn't exist" };
//     }
//     return res.status(200).json({
//       message: "Order updated successfully",
//       data: editOrderById,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server not responding",
//       data: error.message,
//     });
//   }
// };

//delete order of the user
const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrderById = await Order.findByIdAndDelete(req.params);
    if (!deleteOrderById) {
      throw { message: "Order doesn;'t exist" };
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

const cancelOrder = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { status } = req.body;
    const orderId = req.params._id;

    const orderData = await Order.findOne({ _id: orderId });

    if (!orderData) {
      throw { messsage: "order with this id not found" };
    }
    const clientID = orderData.clientID.toString();
    const userID = _id.toString();

    if (clientID != userID) {
      throw { message: "cannot edit the order (not correct customer)" };
    }

    orderData.status = status;

    await orderData.save();

    return res.status(200).json({
      message: "Order is updated successfully",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server is not responding",
      data: error,
    });
  }
};

module.exports = {
  getOrderStatus,
  addOrder,

  deleteOrder,
  getAllOrders,
  cancelOrder,
  addDelivery,
};
