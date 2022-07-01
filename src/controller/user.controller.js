const User = require("../model/user.Model");
const Address = require("../model/address.Model");

const getUserById = async (req, res, next) => {
  try {
    const { _id } = req.query.id;
    const userData = await User.findOne({ _id });
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
    const fieldsToDelete = [
      "userName",
      "email",
      "password",
      "personId",
      "role",
      "notificationToken",
    ];
    const updateFields = _.omit(req.body, fieldsToDelete);

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
    const { street, reference, latitude, longitude } = req.body;
    const addAddressDetail = await new Address({
      street,
      reference,
      latitude,
      longitude,
    });
    await addAddressDetail.save();

    return res.status(200).json({
      success: true,
      message: "Address successfully uploaded",
      data: addAddressDetail
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
    const personId = req.body;
    const personAddress = await User.findOne({ personId: personId });

    if (!personAddress) {
      throw { message: "No address available" };
    }
    return res.status(200).json({
      message: "User Address fetched successfully",
      data: personAddress,
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
    const personId = req.body;
    const delAdd = await Address.deleteOne({ personId: personId });

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
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
};
