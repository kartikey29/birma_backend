const Coupons = require('../model/coupons.Model');


const createCoupons = async (req, res) => {
    try {
        const createCoupons = await Coupons.create(req.body);
        return res.status(200).json({
            message: "Coupons is created",
            data: createCoupons,
        });
    } catch (er) {
        return res.status(400).json({
            message: "User data cannot be edited",
            data: er.message,
        })
    }
}

const getCoupons = async (req, res) => {
    try {
        const getCoupons = await Coupons.find();
        return res.status(200).json({
            message: "Coupons fetched successfully ",
            data: getCoupons,
        });
    } catch (er) {
        return res.status(400).json({
            message: "User data cannot be edited",
            data: er.message,
        })
    }
}

const updateCoupons = async (req, res) => {
    try {
        const updateCoupons = await Coupons.findByIdAndUpdate(req.params, req.body, { new: true });
        if (!updateCoupons) {
            throw { message: "Course not found" }
        }
        return res.status(200).json({
            message: "Coupons update successfully ",
            data: updateCoupons,
        });
    } catch (er) {
        return res.status(400).json({
            message: "User data cannot be edited",
            data: er.message,
        })
    }

}

module.exports = { createCoupons, getCoupons, updateCoupons };