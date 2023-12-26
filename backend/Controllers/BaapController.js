const { baapproducts } = require("../schema/baapProductsSchema");
const { baapcategory } = require("../schema/baapcategorySchema");

const getAllCategories = async (req, res) => {
    const category = await baapcategory.find();
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
};

// const addProducts = async (req, res) => {


//   const productsInstances = req.body.productsList.map((product) => new meeshoproducts(product));
//   meeshoproducts.insertMany(productsInstances)
//     .then((result) => {
//       return res.status(200).json({ status: 200,  message: `${result.length} products saved to the database.`});
//     })
//     .catch((error) => {
//       return res.status(200).json({ status: 200,  message: `Error saving products to the database: ${error}`});
//     });


  // let user = new User({
   
  // })
  // user = await user.save();

  // if(!user)
  // return res.status(200).json({status: 400, message: 'the user cannot be created!'})

  // res.status(200).json({status: 200, message: 'user created'});
// }

const getProducts = async (req, res) => {
    const products = await baapproducts.find({ merci_category: req.body.category});
    if (products) {
      return res.status(200).json({ status: 200, productslist: products });
    }
  
};
const getProduct = async (req, res) => {
  const product = await baapproducts.findById(req.params.id);
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};

const getProductBySKU = async (req, res) => {
  const product = await baapproducts.find({merci_spu_id: req.body.sku});
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};


const updateBaapPrice = async (req, res) => {

    if(await baapproducts.updateMany({
      merci_category: req.body.category
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }

}


const updatehHotProduct = async (req, res) => {

 
     if(await baapproducts.updateMany({
      merci_spu_id: req.body.sku
    }, { $set : {merci_isHot: req.body.status}})){
      return res.status(200).json({ status: 200, message: 'Updated Hot ' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Hot' });
    }
}

const updatehValueProduct = async (req, res) => {

 
  if(await baapproducts.updateMany({
   merci_spu_id: req.body.sku
 }, { $set : {merci_isValuable: req.body.status}})){
   return res.status(200).json({ status: 200, message: 'Updated Valuable ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Updated Valuable' });
 }
}

const deleteProduct = async (req, res) => {

  if(await baapproducts.deleteOne({
   merci_spu_id: req.body.sku
 })){
   return res.status(200).json({ status: 200, message: 'Product Deleted ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Able to Delete Product' });
 }
}



module.exports = { getAllCategories,
  getProducts, 
  getProductBySKU, 
  updateBaapPrice,
  updatehHotProduct,  
  updatehValueProduct,
  deleteProduct 
};
