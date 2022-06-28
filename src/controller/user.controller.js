const User = require("../model/user.Model");
const Address = require("../model/address.Model");

const getUserById = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userData = await User.findOne({ _id, role: "admin" });
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

    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addAddress = async (req, res, next) => {
  try {
    const { street, reference, latitude, longitude } = req.body;
    const addAddressDetail = await Address({
      street,
      reference,
      latitude,
      longitude,
      personId,
    });
    await addAddressDetail.save();

    return res.status(200).json({
      success: true,
      message: "Address successfully uploaded",
      data: [
        {
          street: addAddressDetail.street,
          reference: addAddressDetail.reference,
          latitude: addAddressDetail.latitude,
          longitude: addAddressDetail.longitude,
          personId: addAddressDetail.personId,
        },
      ],
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserAddress = async (req, res, next) => {
  try {
    const personId = req.body;
    const personAddress = await User.findOne({ personId: personId });

    if (!personAddress) {
      throw { message: "No address available" };
    }
    return res.status(200).send({ personAddress });
  } catch (error) {
    return res.status(500).send(error);
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
