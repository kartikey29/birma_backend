const Order = require("../model/order.Model");

const OrderDetail = require("../model/orderDetail.Model");

const getOrderById = async (req, res, next) => {
  try {
    const _id = req.query.id;
    const orderData = await Order.findOne({ clientId: _id });
    if (!orderData) {
      throw { message: "Order doesnt exist" };
    }
    return res.status(200).json({
      message: "All orders fetched",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// const addOrder=async(req,res,next){
//     try{
//         const {}
//         const insertData=await 
//     }catch(error){
//         return res.status(500).json({
//             message:'Server not responding',
//             data:[error.message]
//         })
//     }
// }

module.exports = { getOrderById,addOrder };
