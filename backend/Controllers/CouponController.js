const Coupon = require('../schema/couponSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');

const getCouponsByMerchantId = async (req, res) => {
    const { merchantId } = req.params;
    try {
        const coupons = await Coupon.find({ merchantId });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getCouponsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const coupons = await Coupon.find({ assignedId: userId });
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateCouponAssignment = async (req, res) => {
    const { couponId } = req.params;
    const { assignedTo, assignedId } = req.body;
    try {
        const coupon = await Coupon.findByIdAndUpdate(couponId, { assignedTo, assignedId }, { new: true });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateCouponUsage = async (req, res) => {
    const { couponId } = req.params;
    const { used } = req.body;
    try {
        const coupon = await Coupon.findByIdAndUpdate(couponId, { used }, { new: true });
        if (!coupon) {
            return res.status(404).json({ error: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const insertMultipleCoupons = async (req, res) => {
    const { coupons, amount, merchantId } = req.body;
    try {

        const rooftop = await rooftopShop.findById(merchantId);
        if (!rooftop) {
            return res.status(404).json({ error: 'Merchant not found' });
        }

        // Update the merchant's fields
        rooftop.merci_green_money -= amount;
        rooftop.merci_coupons_generated += parseInt(amount);
        rooftop.merci_coupons_balance += parseInt(amount);

        // Save the updated merchant
        await rooftop.save();
        await Coupon.insertMany(coupons);
        res.status(200).json({status: 400, message: 'Coupons Generated Successfully' });
    } catch (error) {
        res.status(200).json({ status: 400, message: 'Server error' });
    }
};

module.exports = {
    getCouponsByMerchantId,
    getCouponsByUserId,
    updateCouponAssignment,
    updateCouponUsage,
    insertMultipleCoupons
};