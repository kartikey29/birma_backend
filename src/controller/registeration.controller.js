const User = require("../model/user.Model");
const JWT = require("jsonwebtoken");

//registeration for delivery and client
const registerDelivery = async (req, res, next) => {
  try {
    const { UID } = req.body;
    // console.log(req.body,req.file);
    image = req.file.path;
    req.body.image = image;
    //console.log(req.body);
    const findUserId = await User.findOne({ UID: UID });
    // console.log(findUserId);
    if (!findUserId) {
      const registerDelivery = await User.create(req.body);
      // console.log(registerDelivery);
      const jwt = JWT.sign({ _id: registerDelivery._id }, process.env.JWTKEY);
      Object.assign(registerDelivery, { token: jwt });
      await registerDelivery.save();
      return res.status(200).json({
        message: "user delivery is created successfully",
        data: { token: jwt, user: registerDelivery },
      });
    } else {
      res.status(409).json({
        error: "UID already exist",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "Server is Not Responding",
      data: [error.message],
    });
  }
};

//registeration for client
// const registerClient = async (req, res, next) => {
//   try {
//     const { UID } = req.body;
//     // console.log(req.body,req.file);
//     image = req.file.path;
//     req.body.image = image;
//     //console.log(req.body);
//     const findUserId = await User.findOne({ UID: UID });
//     // console.log(findUserId);
//     if (!findUserId) {
//       const registerClient = await User.create(req.body);
//       console.log(registerClient);
//       const jwt = JWT.sign({ _id: registerClient._id }, process.env.JWTKEY);
//       Object.assign(registerClient, { token: jwt });
//       await registerClient.save();
//       return res.status(200).json({
//         message: "user client is created successfully",
//         data: { token: jwt, user: registerClient },
//       });
//     } else {
//       res.status(409).json({
//         error: "UID already exist",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: "Server is Not Responding",
//       data: [error.message],
//     });
//   }
// };

module.exports = { registerDelivery, };
