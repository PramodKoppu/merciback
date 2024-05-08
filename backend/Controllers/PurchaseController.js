const PurchasedData = require('../schema/purchasedSchema');

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
            returnDate
        } = req.body;

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
            returnDate
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

const updateStatus = async (req, res) => {
    try {
        const { ORID, status } = req.body;

        const updatedData = await PurchasedData.updateMany({ ORID }, { $set: { status } });

        if (updatedData.nModified > 0) {
            return res.status(200).json({ status: 200, message: 'Status updated successfully' });
        } else {
            return res.status(400).json({ status: 400, message: 'Status not updated' });
        }
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
    updateStatus,
    updateRefund
}
