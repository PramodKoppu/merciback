const express = require('express');
const router = express.Router();
const couponController = require('../Controllers/CouponController');

// Get coupons by merchantId
router.get('/merchant/:merchantId', couponController.getCouponsByMerchantId);

// Get coupons by userId
router.get('/user/:userId', couponController.getCouponsByUserId);

// Update assignedTo and assignedId
router.put('/assign/:couponId', couponController.updateCouponAssignment);

// Update used field
router.put('/used/:couponId', couponController.updateCouponUsage);

router.post('/multiple', couponController.insertMultipleCoupons);

module.exports = router;