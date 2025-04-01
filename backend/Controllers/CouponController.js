const Coupon = require('../schema/couponSchema');
const RequestCoupon = require('../schema/requetCouponSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');
const { UserGlobal } = require('../schema/userGlobalSchema');
const { greenMoneyTr } = require('../test/wp');

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
    const { coupons, amount, merchantId, phone } = req.body;
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
        greenMoneyTr(phone, rooftop.merci_full_name, amount);
        res.status(200).json({status: 400, message: 'Coupons Generated Successfully' });
    } catch (error) {
        res.status(200).json({ status: 400, message: 'Server error' });
    }
};

const requestCoupon = async (req, res) => {
    try {
      const { merchantId, userPhone } = req.body;
  
      if (!merchantId || !userPhone) {
        return res.status(400).json({ message: "merchantId and userPhone are required" });
      }
  
      const newRequest = new RequestCoupon({
        merchantId,
        userPhone
      });
  
      await newRequest.save();
  
      res.status(201).json({ message: "Request submitted successfully", data: newRequest });
    } catch (error) {
      res.status(500).json({ message: "Error saving request", error: error.message });
    }
  };


  const getRequestsByMerchant = async (req, res) => {
    try {
      const { merchantId } = req.params;
  
      if (!merchantId) {
        return res.status(400).json({ message: "merchantId is required" });
      }
  
      const requests = await RequestCoupon.find({ merchantId }).sort({ createdAt: -1 });
  
      res.status(200).json({ message: "Requests fetched successfully", data: requests });
    } catch (error) {
      res.status(500).json({ message: "Error fetching requests", error: error.message });
    }
  };


  const updateRequestStatus = async (req, res) => {
    try {
      const { requestId, status } = req.body;
  
      if (!requestId || !status) {
        return res.status(400).json({ message: "requestId and status are required" });
      }
  
      const allowedStatuses = ["pending", "approved", "declined"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const updated = await RequestCoupon.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      res.status(200).json({ message: "Status updated", data: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating request", error: error.message });
    }
  };

  
  const getRequestsByUserPhone= async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const user = await UserGlobal.findById(userId);
  
      if (!user || !user.merci_phone) {
        return res.status(404).json({ message: "User not found or phone missing" });
      }
  
      const userPhone = user.merci_phone;
  
      const requests = await RequestCoupon.find({ userPhone }).sort({ createdAt: -1 });
  
      if (requests.length === 0) {
        return res.status(404).json({ message: "No requests found for this user" });
      }
  
      res.status(200).json({
        message: "Coupon requests retrieved successfully",
        data: requests,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user requests", error: error.message });
    }
  };


module.exports = {
    getCouponsByMerchantId,
    getCouponsByUserId,
    updateCouponAssignment,
    updateCouponUsage,
    insertMultipleCoupons,
    requestCoupon,
    getRequestsByMerchant,
    updateRequestStatus,
    getRequestsByUserPhone
};