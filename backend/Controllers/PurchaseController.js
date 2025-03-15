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

const createPurchasedData = async (req, res) => {
  try {
    const {  ORID, userId, orderID, paymentID, address, cartData, total, shippingFee, discount, returnDate, discountData } = req.body;

    const user = await UserGlobal.findById(userId).select("-merci_password");
    
    const commissionUpdates = [];
    
    for (let update of discountData) {

      const { merchantId, coupon, valueUsed } = update;
      const rooftopShopData = await rooftopShop.findById(merchantId).select('merci_refer merci_plan merci_coupons_used');
      
      // 🏷️ Only calculate if Plan Two
  if (rooftopShopData.merci_plan === "plan_two") {
    const newCouponsUsed = rooftopShopData.merci_coupons_used + valueUsed; // Calculate new coupon usage

    
    // 🏷️ Trigger commission ONLY when newCouponsUsed crosses 3000 or 6000 ONCE
    if ((newCouponsUsed >= 3000 && rooftopShopData.merci_coupons_used < 3000) || 
        (newCouponsUsed >= 6000 && rooftopShopData.merci_coupons_used < 6000)) {
      
      const user = await User.findOne({ merci_refer_id: rooftopShopData.merci_refer }).lean();
      if (!user) continue;

      const merci_tree = user.merci_tree;
      const merci_level = user.merci_level;

      // 🏷️ Calculate commission for the milestone (3000 or 6000)
      const finalCommissionData = distributePayment(merchantId, "shop", "", merci_tree, merci_level, 3000, false, true);

      
      // 🏷️ Save commission data
      const newCommissionData = new CommissionData(finalCommissionData);
      await newCommissionData.save();
    
    }
  }

      const userWithRefer = await User.findOne({ merci_refer_id: rooftopShopData.merci_refer });

      if (userWithRefer) {
        const { merci_level, merci_tree, merci_refer_id } = userWithRefer;
        merci_tree[merci_level.replace(' ', '')] = merci_refer_id;
        const newCommissionData = new CommissionData(setCommision(merchantId, merci_tree, discount));
        commissionUpdates.push(newCommissionData.save());
      }

      const rooftopShopUpdate = rooftopShop.findByIdAndUpdate( merchantId, { $inc: {
            merci_coupons_balance: -valueUsed.toFixed(2),
            merci_coupons_used: valueUsed.toFixed(2),
          },
        },
        { new: true }
      );

      const couponUpdate = Coupon.findOneAndUpdate( { coupon: coupon }, {
          $inc: {
            used: valueUsed.toFixed(2),
          },
        },
        { new: true }
      );

      // Execute updates concurrently
      await Promise.all([rooftopShopUpdate, couponUpdate]);
  }

    // Save all commission data concurrently
    await Promise.all(commissionUpdates);

    // Save purchased data
    const purchasedData = new PurchasedData({ ORID, userId, orderID, paymentID, address, cartData, total, shippingFee, discount, returnDate, discountData });
    await purchasedData.save();

    // Send confirmation email
    sendEmail(user.merci_email, `Your Order has been placed # ${ORID}`, shippingDetail(req.body));
    sendTemplateMessage(user.merci_phone, user.merci_full_name, ORID, formatDate())
    res.status(201).json({message: "Purchased data created successfully", data: purchasedData,});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShopData = async (req, res) => {
  try {
    const { ORID, userId, orderID, paymentID, total, refer } = req.body;
    const shopPay = new shopPayment({ ORID, userId, orderID, paymentID, total, refer});
    const user = await User.findOne({ merci_refer_id: refer }).lean();

    const merci_tree = user.merci_tree;
    const merci_level = user.merci_level;

    const finalCommissionData = distributePayment(userId, "shop", refer, merci_tree, merci_level, total, false, false)
    const newCommissionData = new CommissionData(finalCommissionData);
    await newCommissionData.save();
    
    await shopPay.save();
    await rooftopShop.findByIdAndUpdate(userId, { merci_isPayment: true });
    // sendEmail(user.merci_email, `Your Order has been placed # ${ORID}`, shippingDetail(req.body))
    res
      .status(201)
      .json({
        message: "Purchased has been successful",
        data: shopPayment,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createMonthlyData = async (req, res) => {
  try {
    const { ORID, userId, orderID, paymentID, total, refer } = req.body;

    const shopPay = new shopPayment({
      ORID,
      userId,
      orderID,
      paymentID,
      total,
      refer,
    });

    const user = await User.findOne({ merci_refer_id: refer }).lean();

    const merci_tree = user.merci_tree;
    const merci_level = user.merci_level;

    const distribution = distributePayment(merci_tree, merci_level, total, true)

    const commissionData = Object.keys(merci_tree).map(level => ({
        level: level.replace(/(\d)/, ' $1'),  // Format the level as 'Level 1', 'Level 2', etc.
        refer_id: level === merci_level.replace(' ', '') ? refer : merci_tree[level],
        commission: distribution[level] || 0
      }));
  
      const finalCommissionData = {
        userId,
        paymentType: 'monthly',
        level1: commissionData.find(data => data.level === 'Level 1').refer_id,
        commissionL1: commissionData.find(data => data.level === 'Level 1').commission,
        level2: commissionData.find(data => data.level === 'Level 2').refer_id,
        commissionL2: commissionData.find(data => data.level === 'Level 2').commission,
        level3: commissionData.find(data => data.level === 'Level 3').refer_id,
        commissionL3: commissionData.find(data => data.level === 'Level 3').commission,
        level4: commissionData.find(data => data.level === 'Level 4').refer_id,
        commissionL4: commissionData.find(data => data.level === 'Level 4').commission
      };

      // console.log(finalCommissionData);

      const newCommissionData = new CommissionData(finalCommissionData);
      await newCommissionData.save();
      
      
    res
      .status(201)
      .json({
        message: "Purchased has been successful",
        data: shopPayment,
      });
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
  createShopData,
  getCommissionData,
  createMonthlyData
};
