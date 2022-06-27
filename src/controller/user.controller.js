const User = require("../model/user.Model");
const Address = require("../model/address.Model");

const getUserById = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userData = await User.findOne({ _id });

    if (!userData) {
      throw { message: "user doesnt exist" };
    }
    return res.status(200).send({ userData });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const { userName, email, personId, role } = req.body;
    const userData = await User.findOne({ _id }).populate({
      populate: [],
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const addAddressDetail = await Address({
      street,
      reference,
      latitude,
      longitude,
      personId,
    });

    const Address = await addAddressDetail.save();

    return res.status(200).json({
      message: "Address successfully uploaded",
      Address: [Address],
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserAddress = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getUserById,
  editProfile,
  addAddress,
  getUserAddress,
  deleteAddress,
};
