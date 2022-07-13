const User = require("../model/user.Model");
const Address = require("../model/address.Model");
const _ = require("lodash");
const JWT = require("jsonwebtoken");

//user login
const loginUser = async (req, res, next) => {
  try {
    const { UID } = req.body;

    const user = await User.findOne({ UID }); //find user by UID

    if (!user) {
      throw { message: "user doesnt exist" };
    }

    const jwt = JWT.sign({ _id: user._id }, process.env.JWTKEY);
    Object.assign(user, { token: jwt });

    await user.save();
    return res.send({ token: jwt, UID: user.UID });
  } catch (e) {
    return res.status(504).send(e);
  }
};

//Adding user to database
const addUser = async (req, res) => {
  try {
    req.body.image =
      req.file === undefined
        ? ""
        : `${process.env.BACKEND_URL}userImages/${req.file.filename}`;

    const user = await User.create(req.body);

    return res.status(200).json({
      success: true,
      message: " Data Successfully Uploaded",
      data: user,
    });
  } catch (error) {
    return res.status(504).json(error);
  }
};

//get All the user from database
const getAllUser = async (req, res, next) => {
  try {
    const fetchedData = await User.find();

    return res.status(200).json({
      success: true,
      message: "Data Fetched SuccessFully ",
      data: fetchedData,
    });
  } catch (error) {
    return res.status(504).json({ error: "Server is not responding " });
  }
};

// find the user by Id
const getUserById = async (req, res, next) => {
  try {
    // console.log(req.user.token);
    const userData = await User.findOne({ token: req.user.token }); //finding the user by token
    // console.log(userData);
    if (!userData) {
      throw { message: "User doesnt exist" };
    }
    return res.status(201).json({
      message: "User fetched successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "No User by this Id",
      data: error.message,
    });
  }
};

//update the user by id
const editProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const { _id } = req.user;
    console.log(req.body);
    const fieldsToDelete = [
      "UID",
      "phone",
      "state",
      "role_Id",
      "notificationToken",
      "token",
    ];
    const updateFields = _.omit(req.body, fieldsToDelete); //filter the fields to be updated

    const user = await User.findByIdAndUpdate(_id, updateFields, {
      returnOriginal: false,
    });
    if (!user) {
      throw { message: "User doesnt exist" };
    }

    return res.status(200).json({
      message: "User data edited successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "User data cannot be edited",
      data: error.message,
    });
  }
};

//add user address
const addAddress = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const { street, reference, latitude, longitude, userId } = req.body;
    //userId = req.user.UID;
    //console.log(userId);
    const addAddressDetail = new Address({
      street,
      reference,
      latitude,
      longitude,
      userId,
    });

    await addAddressDetail.save();

    return res.status(200).json({
      success: true,
      message: "Address successfully uploaded",
      data: addAddressDetail,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server is not responding",
      data: error.message,
    });
  }
};

//fetch user address from the database
const getUserAddress = async (req, res, next) => {
  try {
    //console.log(req.user._id);
    const userAddress = await Address.findOne({ userId: req.user._id });
    console.log(userAddress);
    if (!userAddress) {
      throw { message: "No address available" };
    }
    return res.status(200).json({
      message: "User Address fetched successfully",
      data: userAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "User address cannot be fetched",
      data: error.message,
    });
  }
};

//delete user address from the database
const deleteAddress = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { _id } = req.user;
    const checkUser = await Address.findOne({ userId: _id });
    if (!checkUser) {
      throw { message: "user doesnt exist" };
    }
    // console.log(checkUser);
    const delAdd = await Address.findByIdAndRemove(checkUser._id);
    if (!delAdd) {
      throw { message: "No address available" };
    }
    return res
      .status(200)
      .json({ message: "Address deleted successfully", data: delAdd });
  } catch (error) {
    return res.status(500).json({
      data: error,
    });
  }
};

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
  loginUser,
};
