const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();
const crypto = require('crypto');

const paymentControl = async (req, res) => {
    
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        if(!req.body){
            return res.status(400).send("Bad Request");

        }
        const options = req.body;
        const order = await razorpay.orders.create(options);
        if(!order){
            return res.status(400).send("Bad Request");
        }
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}

const paymentValidate = (req,res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    // order_id + " | " + razorpay_payment_id

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest!== razorpay_signature) {
        return res.status(200).json({status: 400, msg: "Transaction is not complete.Please contact admin for further details."});
    }
    res.status(200).json({status: 200, msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
}


module.exports =  { 
    paymentControl, 
    paymentValidate 
}; 