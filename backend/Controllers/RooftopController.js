const PurchasedData = require('../schema/purchasedSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');
const bcrypt = require('bcryptjs');

// const getrooftopShops = async (req, res) => {

//     const rooftopShopList = await rooftopShop.find().select('-merci_password');
//     if(!rooftopShopList) {
//         res.status(500).json({success: false})
//     } 
//     res.status(200).send(rooftopShopList);
// }

const getrooftopShop = async (req, res) => {
    const rooftop = await rooftopShop.findOne({merci_user_name: req.body.userName}).select('-merci_password');
    if(!rooftop) {
        return res.status(200).json({message: 'Shop with the given Username is not found.'})
    } 
    return res.status(200).send(rooftop);
}  


const createrooftopShop = async (req, res) => {

    let data = req.body.shopDetails;
    data = {...data, merci_password: bcrypt.hashSync(data.merci_password, 10)}
    //let rooftopShopVal = new rooftopShop(data);
    rooftopRes = await rooftopShop.insertMany(data);
    if(!rooftopRes)
    return res.status(200).json({status: 400, message: 'Rooftop cannot be created!'})
    res.status(200).json({status: 200, message: 'Shop created'});
}

// const updaterooftopShop = (req, res) => {
//     res.status(200).json({message : 'update rooftopShop Request'})
// }

// const deleterooftopShop = (req, res) => {
//     res.status(200).json({message : 'Delete rooftopShop Request'})
// }

const checkrooftopShopName = async (req,res) => {
    const rooftop = await rooftopShop.findOne({merci_user_name: req.body.userName})
    if(!rooftop) {
        return res.status(200).json({ status: 200,  message: 'Username Not registered'});
    }
    return res.status(200).json({ status: 400, message: 'Username already exsists. Please use another Username'});
}


const rooftopShopsList = async (req,res) => {
    const { refer }  = req.params 
    const shops = await rooftopShop.find({merci_refer: refer})
    if(!shops) {
        return res.status(200).json({ status: 400,  message: 'No Shops Registered With given rooftopShopname'});
    }
    return res.status(200).json({ status: 200, rooftopShopsList: shops});
}

const rooftopActive = async (req, res) => {
    const id = req.body.id;
    const valBool = req.body.val;
    const idChange = await rooftopShop.updateOne({_id: id},{$set: {merci_isActive: !valBool}})
    if(idChange) {
        return res.status(200).json({ status: 200,  message: 'Shop Status has been updated'});
    }
    return res.status(200).json({ status: 200, message: 'Shop Status cannot be updated'});
}

const findbyMerchantId = async (req,res) => {
    const merchantId = req.body.merchantId;
    try {
      const results = await PurchasedData.aggregate([
        { $unwind: '$discountData' }, 
        { $match: { 'discountData.merchantId': merchantId } }, 
        { $project: { ORID: 1, 'discountData.valueUsed': 1, 'discountData.coupon': 1 } } 
      ]);
  
      const formattedResults = results.map(result => ({
        ORID: result.ORID,
        valueUsed: result.discountData.valueUsed,
        coupon: result.discountData.coupon
      }));
  
      return res.status(200).json({status: 200, data: formattedResults});
    } catch (error) {
        return res.status(200).json({ status: 400, message: 'Server error, please try again'});
    }
  };

module.exports = {
    createrooftopShop,
    rooftopShopsList,
    checkrooftopShopName,
    rooftopActive,
    getrooftopShop,
    findbyMerchantId
}

