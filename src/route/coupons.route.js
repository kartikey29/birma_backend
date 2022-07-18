const couponsRoute = require("express").Router();
const { createCoupons,getCoupons ,updateCoupons,deleteCoupons} = require('../controller/coupons.controller')


couponsRoute.post("/createCoupons", createCoupons);

couponsRoute.get("/getCoupons", getCoupons);

couponsRoute.patch("/updateCoupons/:_id",updateCoupons);

couponsRoute.delete("/deleteCoupons/:_id",deleteCoupons);

module.exports = couponsRoute;