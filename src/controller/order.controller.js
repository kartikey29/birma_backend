const Order = require("../model/order.Model");
const User = require("../model/user.Model");

//const OrderDetail = require("../model/orderDetail.Model");
// const { options } = require("../route/user.route");

const getOptions = (page) => {
  const options = {
    page: page,
    limit: 20,
    sort: {
      createdAt: -1,
    },
    populate: [
      {
        path: 'clientID'
      },
      {
        path: 'address'
      },
      {
        path: 'deliveryId'
      },
      {
        path: 'products.productId'
      }
    ]
  };
  return options;
};

//create an order
const addOrder = async (req, res, next) => {
  try {
    const { role_Id } = req.user;
    // console.log(role_Id);

    if (role_Id !== "1") {
      throw { messgae: "Order created by someone whose not client" };
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
    const { page, search } = req.query;
   // console.log(page, search);
    let searchClause = {};
    if (search) {
      searchClause = { $text: { $search: search } };
    }
    const options = getOptions(page);
    const getOrders = await Order.paginate(searchClause, options);
    return res.send(getOrders);
  } catch (e) {
    return res.status(504).send(e);
  }
};

//get order staus by clientID
const getOrderStatus = async (req, res, next) => {
  try {
    const { role_Id,_id } = req.user;
    if (role_Id !== '1') {
      throw { message: "Order created by someone whose not client" };
    }

    const orderData = await Order.findOne({clientID:_id});
    return res.send(orderData.status);
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

module.exports = {
  getOrderStatus,
  addOrder,
  editOrder,
  deleteOrder,
  getAllOrders,
};
