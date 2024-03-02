const { deodapcategory } = require("../schema/deodapcategorySchema");
const {deodapproducts} = require("../schema/deodapproductsSchema");
// const { cjproducts } = require("../schema/cjProductsSchema");

const getAllCategories = async (req, res) => {
  const category = await deodapcategory.find();
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
};

const getProducts = async (req, res) => {
  const products = await deodapproducts.find({ merci_category: req.body.category});
  if (products) {
    return res.status(200).json({ status: 200, productslist: products });
  }

};
const getProduct = async (req, res) => {
const product = await deodapproducts.findById(req.params.id);
if (product) {
  return res.status(200).json({ status: 200, productslist: product });
}
};

const getProductBySKU = async (req, res) => {
const product = await deodapproducts.find({merci_spu_id: req.body.sku});
if (product) {
  return res.status(200).json({ status: 200, productslist: product });
}
};


const updateDeodapPrice = async (req, res) => {
  if(await deodapproducts.updateMany({
    merci_category: req.body.category
  }, { $set : {merci_merci_discount: parseInt(req.body.price)}})){
    return res.status(200).json({ status: 200, message: 'Updated Price' });
  }else{
    return res.status(200).json({ status: 400, message: 'Not Updated Price' });
  }

}

const updateSingleDeodapPrice = async (req, res) => {
  if(await deodapproducts.updateOne({
    merci_sku: req.body.sku
  }, { $set : {merci_merci_discount: parseInt(req.body.price)}})){
    return res.status(200).json({ status: 200, message: 'Updated Price' });
  }else{
    return res.status(200).json({ status: 400, message: 'Not Updated Price' });
  }

}


const updatehHotProduct = async (req, res) => {


   if(await deodapproducts.updateMany({
    merci_sku: req.body.sku
  }, { $set : {merci_isHot: req.body.status}})){
    return res.status(200).json({ status: 200, message: 'Updated Hot ' });
  }else{
    return res.status(200).json({ status: 400, message: 'Not Updated Hot' });
  }
}

const updatehValueProduct = async (req, res) => {


if(await deodapproducts.updateMany({
 merci_sku: req.body.sku
}, { $set : {merci_isValuable: req.body.status}})){
 return res.status(200).json({ status: 200, message: 'Updated Valuable ' });
}else{
 return res.status(200).json({ status: 400, message: 'Not Updated Valuable' });
}
}

const deleteProduct = async (req, res) => {

if(await deodapproducts.deleteOne({
 merci_sku: req.body.sku
})){
 return res.status(200).json({ status: 200, message: 'Product Deleted ' });
}else{
 return res.status(200).json({ status: 400, message: 'Not Able to Delete Product' });
}
}

module.exports = { getAllCategories, 
  // addProducts,
  getProducts, 
  getProduct, 
  getProductBySKU, 
  updateDeodapPrice,
  updatehHotProduct,  
  updatehValueProduct,
  deleteProduct,
  updateSingleDeodapPrice
};
