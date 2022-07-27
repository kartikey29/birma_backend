const Coupons = require('../model/coupons.Model');
const io = require('../../socket.io');


const createCoupons = async (req, res) => {
    try {
        const createCoupons = await Coupons.create(req.body);
        io.getIo().emit('ports', { action: 'create', port: createCoupons })
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

const getCouponById = async (req, res) => {
    try {
        const getCoupon = await Coupons.findById(req.params);
        if (!getCoupon) {
            throw { message: "coupon id not found " }
        }
        return res.status(200).json({
            message: "coupon fetched successfully ",
            data: getCoupon
        })
    } catch (er) {
        return res.status(400).json({
            message: "user data cannot be fetched",
            data: er.message
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

const deleteCoupons = async (req, res) => {
    try {
        const deleteCoupons = await Coupons.findByIdAndRemove(req.params);
        if (!deleteCoupons) {
            throw { message: "coupons id not found" }
        }
        return res.status(201).json({
            message: "coupons id deleted successfully",
            data: deleteCoupons,
        });
    } catch (er) {
        return res.status(400).json({
            message: "cannot be deleted",
            data: er.message,
        })
    }
}

module.exports = { createCoupons, getCoupons, updateCoupons, deleteCoupons, getCouponById };