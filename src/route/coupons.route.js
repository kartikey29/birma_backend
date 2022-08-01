const couponsRoute = require("express").Router();
const { createCoupons, getCoupons, updateCoupons, deleteCoupons, getCouponById } = require('../controller/coupons.controller')


couponsRoute.post("/createCoupons", createCoupons);

couponsRoute.get("/getCoupons", getCoupons);

couponsRoute.get("/getCouponById/:_id", getCouponById)

couponsRoute.patch("/updateCoupons/:_id", updateCoupons);

couponsRoute.delete("/deleteCoupons/:_id", deleteCoupons);

module.exports = couponsRoute; 