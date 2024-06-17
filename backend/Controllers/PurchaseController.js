const PurchasedData = require('../schema/purchasedSchema');
const Coupon = require('../schema/couponSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');
const mongoose = require('mongoose');

const createPurchasedData = async (req, res) => {
    try {
        const {
            ORID,
            userId,
            orderID,
            paymentID,
            address,
            cartData,
            total,
            shippingFee,
            discount,
            returnDate,
            discountData
        } = req.body;

        // const merid = mongoose.Types.ObjectId(merchant);

        for (let update of discountData) {
            const { merchantId, coupon, valueUsed } = update;
            
            // Update the rooftopShop collection
            await rooftopShop.findByIdAndUpdate(
                merchantId,
                {
                    $inc: {
                        merci_coupons_balance : -valueUsed.toFixed(2),
                        merci_coupons_used : valueUsed.toFixed(2)
                    }
                },
                { new: true }
            );
    
            // Update the Coupon collection
            await Coupon.findOneAndUpdate(
                { coupon: coupon },
                {
                    $inc: {
                        used: valueUsed.toFixed(2)
                    }
                },
                { new: true }
            );
        }


        const purchasedData = new PurchasedData({
            ORID,
            userId,
            orderID,
            paymentID,
            address,
            cartData,
            total,
            shippingFee,
            discount,
            returnDate,
            discountData,
        });

        await purchasedData.save();

        res.status(201).json({ message: 'Purchased data created successfully', data: purchasedData });
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
        const data = await PurchasedData.find({userId: id});
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
    const { ORID, spuid } = req.body;

    try {
        const order = await PurchasedData.findOne({ORID: ORID});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const item = order.cartData.find(item => item.merci_spu_id === spuid);
        if (item) {
            item.status += 1;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { ORID, spuid } = req.body;

    try {
        const order = await PurchasedData.findOne({ORID: ORID});
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const item = order.cartData.find(item => item.merci_spu_id === spuid);
        if (item) {
            item.status = 5;
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
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

        const updatedData = await PurchasedData.updateMany({ ORID }, { $set: { refund } });

        if (updatedData.nModified > 0) {
            return res.status(200).json({ status: 200, message: 'Refund status updated successfully' });
        } else {
            return res.status(400).json({ status: 400, message: 'Refund status not updated' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports ={
    createPurchasedData,
    getDataWithUserID,
    getPurchaseData,
    updateStatus,
    updateRefund,
    getPurchaseDataById,
    cancelOrder
}
