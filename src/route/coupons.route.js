const couponsRoute = require("express").Router();
const { createCoupons,getCoupons ,updateCoupons} = require('../controller/coupons.controller')


couponsRoute.post("/createCoupons", createCoupons);

couponsRoute.get("/getCoupons", getCoupons);

couponsRoute.patch("/updateCoupons/:_id",updateCoupons);

module.exports = couponsRoute;