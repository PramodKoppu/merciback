const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();

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
        console.log(error);
        res.status(500).send(error);
    }
}


module.exports =  paymentControl; 