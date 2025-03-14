const PurchasedData = require("../schema/purchasedSchema");
const Coupon = require("../schema/couponSchema");
const { UserGlobal } = require("../schema/userGlobalSchema");
const sendEmail = require("../utils/EmailConfig");
const shippingDetail = require("../constants/ShippingDetails");
const shopPayment = require("../schema/shopPaymentSchema");
const { User } = require("../schema/userSchema");
const distributePayment = require("../utils/distribution");
const CommissionData = require("../schema/commissionSchema");
const { rooftopShop } = require('../schema/rooftopShopSchema');
const setCommision = require('../utils/setCommissions');
const { sendTemplateMessage, sendWPStatus } = require("../test/wp");


const formatDate = () => {
  const today = new Date();
  return `${today.getDate()}, ${today.toLocaleString('default', { month: 'short' })}, ${today.getFullYear()}`;
};

// **Function to handle commissions for Plan Two**
const handlePlanTwoCommission = async (merchantId, valueUsed, discount) => {
  try {
    const rooftopShopData = await rooftopShop.findById(merchantId).select("merci_refer merci_coupons_used merci_plan");
    if (!rooftopShopData || rooftopShopData.merci_plan !== "plan_two") return;

    const userId = rooftopShopData.merci_refer;
    const userWithRefer = await User.findOne({ merci_refer_id: userId });
    if (!userWithRefer) return;

    let newCouponsUsed = parseFloat(rooftopShopData.merci_coupons_used) + parseFloat(valueUsed);
    const { merci_tree, merci_level } = userWithRefer;
    let commissionData = [];

    // Trigger commission at 3000 & 6000 milestones
    [3000, 6000].forEach((milestone) => {
      if (newCouponsUsed >= milestone && rooftopShopData.merci_coupons_used < milestone) {
        commissionData.push(
          { level: "Level 4", refer_id: merci_tree["Level 4"] || null, commission: 1500 },
          { level: "Level 3", refer_id: merci_tree["Level 3"] || null, commission: 300 },
          { level: "Level 2", refer_id: merci_tree["Level 2"] || null, commission: 150 },
          { level: "Level 1", refer_id: merci_tree["Level 1"] || null, commission: 0 }
        );
      }
    });


    if (commissionData.length) {
      const finalCommissionData = {
        userId,
        paymentType: "shop",
        level1: commissionData.find(data => data.level === "Level 1")?.refer_id,
        commissionL1: commissionData.find(data => data.level === "Level 1")?.commission || 0,
        level2: commissionData.find(data => data.level === "Level 2")?.refer_id,
        commissionL2: commissionData.find(data => data.level === "Level 2")?.commission || 0,
        level3: commissionData.find(data => data.level === "Level 3")?.refer_id,
        commissionL3: commissionData.find(data => data.level === "Level 3")?.commission || 0,
        level4: commissionData.find(data => data.level === "Level 4")?.refer_id,
        commissionL4: commissionData.find(data => data.level === "Level 4")?.commission || 0,
      };

      await new CommissionData(finalCommissionData).save();
    }

    // Update rooftopShop & Coupon balance
    await Promise.all([
      rooftopShop.findByIdAndUpdate(
        merchantId,
        { $inc: { merci_coupons_balance: -valueUsed, merci_coupons_used: valueUsed } },
        { new: true }
      ),
      Coupon.findOneAndUpdate(
        { coupon: discount.coupon },
        { $inc: { used: valueUsed } },
        { new: true }
      ),
    ]);
  } catch (error) {
    console.error("Error processing Plan Two commission:", error);
  }
};

// **Function to handle purchases**
const createPurchasedData = async (req, res) => {
  try {
    const { ORID, userId, orderID, paymentID, address, cartData, total, shippingFee, discount, returnDate, discountData } = req.body;

    const user = await User.findOne({ merci_refer_id: req.body.userId }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const merci_tree = user.merci_tree;
    const merci_level = user.merci_level;

    // 🏷️ **Calculate commission based on total purchase**
    const distribution = distributePayment(merci_tree, merci_level, total, false);

    // 🏷️ **Prepare commission data for saving**
    const commissionData = Object.keys(merci_tree).map(level => ({
      level,
      refer_id: level === merci_level.replace(" ", "") ? user.merci_refer_id : merci_tree[level],
      commission: distribution[level] || 0
    }));

    // 🏷️ **Prepare final commission data**
    const finalCommissionData = {
      userId: req.body.userId,
      paymentType: "purchase",
      level1: commissionData.find(data => data.level === "Level 1")?.refer_id,
      commissionL1: commissionData.find(data => data.level === "Level 1")?.commission || 0,
      level2: commissionData.find(data => data.level === "Level 2")?.refer_id,
      commissionL2: commissionData.find(data => data.level === "Level 2")?.commission || 0,
      level3: commissionData.find(data => data.level === "Level 3")?.refer_id,
      commissionL3: commissionData.find(data => data.level === "Level 3")?.commission || 0,
      level4: commissionData.find(data => data.level === "Level 4")?.refer_id,
      commissionL4: commissionData.find(data => data.level === "Level 4")?.commission || 0,
    };

    // 🏷️ **Save commission data**
    await new CommissionData(finalCommissionData).save();

    
    await Promise.all(discountData.map(async (update) => {
      const { merchantId, valueUsed } = update;
      const rooftopShopData = await rooftopShop.findById(merchantId).select("merci_plan");
      if (!rooftopShopData) return;

      if (rooftopShopData.merci_plan === "plan_two") {
        await handlePlanTwoCommission(merchantId, valueUsed, update);
      } else {
        await Promise.all([
          rooftopShop.findByIdAndUpdate(
            merchantId,
            { $inc: { merci_coupons_balance: -valueUsed, merci_coupons_used: valueUsed } },
            { new: true }
          ),
          Coupon.findOneAndUpdate(
            { coupon: update.coupon },
            { $inc: { used: valueUsed } },
            { new: true }
          ),
        ]);
      }
    }));


    // Save purchased data
    const purchasedData = new PurchasedData({ ORID, userId, orderID, paymentID, address, cartData, total, shippingFee, discount, returnDate, discountData });
    try { 
      await purchasedData.save();
    } catch (err) {
      console.log('errr', err);
    }


    // Notify user
    // const userData = await User.findOne({ merci_refer_id: purchasedData.userId });
    if (user) {
      sendEmail(user.merci_email, `Your Order has been placed # ${ORID}`, shippingDetail(req.body));
      sendTemplateMessage(user.merci_phone, user.merci_full_name, ORID, formatDate());
    }

    res.status(201).json({ message: "Purchased data created successfully", data: purchasedData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Refactored Shop and Monthly Purchase Logic**
const processShopPayment = async (req, res, paymentType) => {
  try {
    const { ORID, userId, orderID, paymentID, total, refer } = req.body;

    const shopPay = new shopPayment({ ORID, userId, orderID, paymentID, total, refer });
    const user = await User.findOne({ merci_refer_id: refer }).lean();
    const merci_tree = user.merci_tree;
    const merci_level = user.merci_level;

    const distribution = distributePayment(merci_tree, merci_level, total, paymentType === "monthly");

    const commissionData = Object.keys(merci_tree).map(level => ({
      level,
      refer_id: level === merci_level.replace(" ", "") ? refer : merci_tree[level],
      commission: distribution[level] || 0
    }));

    const finalCommissionData = {
      userId,
      paymentType,
      level1: commissionData.find(data => data.level === "Level 1")?.refer_id,
      commissionL1: commissionData.find(data => data.level === "Level 1")?.commission || 0,
      level2: commissionData.find(data => data.level === "Level 2")?.refer_id,
      commissionL2: commissionData.find(data => data.level === "Level 2")?.commission || 0,
      level3: commissionData.find(data => data.level === "Level 3")?.refer_id,
      commissionL3: commissionData.find(data => data.level === "Level 3")?.commission || 0,
      level4: commissionData.find(data => data.level === "Level 4")?.refer_id,
      commissionL4: commissionData.find(data => data.level === "Level 4")?.commission || 0,
    };

    await new CommissionData(finalCommissionData).save();
    await shopPay.save();
    await rooftopShop.findByIdAndUpdate(userId, { merci_isPayment: true });

    res.status(201).json({ message: "Purchase successful", data: shopPay });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getCommissionData = async (req, res) => {
  try {
    const { level, refer_id } = req.params;
   
    if (!level || !refer_id) {
      return res.status(400).json({ message: 'Level and refer_id are required' });
    }

    let query = {};
    query[`level${level.match(/\d+/)[0]}`] = refer_id;

    const commissionData = await CommissionData.find(query).lean();

    for (let i = 0; i < commissionData.length; i++) {
      const shopData = await rooftopShop.findById(commissionData[i].userId);
  
      commissionData[i].merci_shop_details = {
          merci_shop_name: shopData.merci_shop_name,
          merci_full_name: shopData.merci_full_name,
          merci_phone: shopData.merci_phone,
      };
  }

    if (commissionData.length === 0) {
      return res.status(404).json({ message: 'No commission data found' });
    }

    res.status(200).json({
      message: 'Commission data retrieved successfully',
      data: commissionData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDataWithUserID = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await PurchasedData.find({ userId });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPurchaseData = async (req, res) => {
  try {
    const data = await PurchasedData.find();

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPurchaseDataById = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await PurchasedData.find({ userId: id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const statusValue = [
    "Order Placed",
    "Order Shipped",
    "Out For Delivery",
    "Delivered",
    "Cancelled",
    "Return Started",
    "Refund Initiated",
    "Refund Completed",
  ];

const updateStatus = async (req, res) => {
  const { name, number, ORID, spuid } = req.body;

  try {
    const order = await PurchasedData.findOne({ ORID: ORID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const item = order.cartData.find((item) => item.merci_spu_id === spuid);
    if (item) {
      item.status += 1;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await order.save();

    sendWPStatus(number, name, ORID, statusValue[item.status-1])

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { ORID, spuid } = req.body;

  try {
    const order = await PurchasedData.findOne({ ORID: ORID });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const item = order.cartData.find((item) => item.merci_spu_id === spuid);
    if (item) {
      item.status = 5;
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRefund = async (req, res) => {
  try {
    const { ORID, refund } = req.body;

    const updatedData = await PurchasedData.updateMany(
      { ORID },
      { $set: { refund } }
    );

    if (updatedData.nModified > 0) {
      return res
        .status(200)
        .json({ status: 200, message: "Refund status updated successfully" });
    } else {
      return res
        .status(400)
        .json({ status: 400, message: "Refund status not updated" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPurchasedData,
  getDataWithUserID,
  getPurchaseData,
  updateStatus,
  updateRefund,
  getPurchaseDataById,
  cancelOrder,
  getCommissionData,
  createShopData: (req, res) => processShopPayment(req, res, "shop"),
  createMonthlyData: (req, res) => processShopPayment(req, res, "monthly"),
};
