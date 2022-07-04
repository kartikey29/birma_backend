const User = require("../model/user.Model");
const Address = require("../model/address.Model");
const _ = require("lodash");

const addUser = async (req, res, next) => {
  try {
    const {
      UID,
      firstName,
      lastName,
      phone,
      image,
      state,
      email,
      role,
      notificationToken,
    } = req.body;

    const addDetail = await new User({
      UID,
      firstName,
      lastName,
      phone,
      image,
      state,
      email,
      role,
      notificationToken,
    });

    const Data = await addDetail.save();

    return res.status(200).json({
      success: true,
      message: " Data Successfully Uploaded",
      data: Data,
    });
  } catch (error) {
    return res.status(504).json({ error: "Server is not responding " });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const fetchedData = await User.find({});

    return res.status(200).json({
      success: true,
      message: "Data Fetched SuccessFully ",
      data: fetchedData,
    });
  } catch (error) {
    return res.status(504).json({ errro: "Server is not responding " });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);
    const userData = await User.findById(id);
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

const editProfile = async (req, res, next) => {
  try {
    const { _id } = req.body;
    console.log(req.body);
    const fieldsToDelete = [
      "phone",
      "state",
      "email",
      "role",
      "notificationToken",
    ];
    const updateFields = _.omit(req.body, fieldsToDelete);
    console.log(updateFields);
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

const addAddress = async (req, res, next) => {
  try {
    const { street, reference, latitude, longitude, userId } = req.body;
    const addAddressDetail = await new Address({
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

const getUserAddress = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const userAddress = await Address.findOne({ userId: userId });

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

const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.body;
    const delAdd = await Address.deleteOne({ userId: userId });

    if (!delAdd) {
      throw { message: "No address available" };
    }
    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Address cannot be deleted",
      data: error.message,
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
};
