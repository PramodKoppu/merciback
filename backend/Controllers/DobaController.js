const { categorylists } = require("../schema/categorylistsSchema");
const { dobaproducts } = require("../schema/dobaProductsSchema");

const getAllCategories = async (req, res) => {
  let category;

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
    category = await categorylists.find({
      merci_company: "doba",
      main_category: req.body.main_cat,
    });
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  } else if (
    req.body.main_cat !== "" &&
    req.body.sub_cat !== "" &&
    req.body.low_cat === ""
  ) {
    category = await categorylists.find({
      merci_company: "doba",
      main_category: req.body.main_cat,
      sub_category: req.body.sub_cat,
    });
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  } else {
    category = await categorylists.find();
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  }
};

const getProducts = async (req, res) => {
  let products;

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
    products = await dobaproducts.find({ main_main_cat: req.body.main_cat });
    if (products) {
      return res.status(200).json({ status: 200, productslist: products });
    }
  } else if (
    req.body.main_cat !== "" &&
    req.body.sub_cat !== "" &&
    req.body.low_cat === ""
  ) {
    products = await dobaproducts.find({
      merci_main_cat: req.body.main_cat,
      merci_sub_cat: req.body.sub_cat,
    });
    if (products) {
      return res.status(200).json({ status: 200, productslist: products });
    }
  } else if (
    req.body.main_cat !== "" &&
    req.body.sub_cat !== "" &&
    req.body.low_cat !== ""
  ) {
    products = await dobaproducts.find({
      merci_main_cat: req.body.main_cat,
      merci_sub_cat: req.body.sub_cat,
      merci_low_cat: req.body.low_cat,
    });
    if (products) {
      return res.status(200).json({ status: 200, productslist: products });
    }
  } else {
    products = await dobaproducts.find();
    if (products) {
      return res.status(200).json({ status: 200, productslist: products });
    }
  }
};
const getProduct = async (req, res) => {
  const product = await dobaproducts.findById(req.params.id);
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};

const getProductBySKU = async (req, res) => {
  const product = await dobaproducts.find({merci_spu_id: req.body.sku});
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};

const getCategory = async (req, res) => {

  let category;

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
    category = await dobaproducts.find({
      merci_main_cat: req.body.main_cat
    }).distinct("merci_sub_cat");
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  } else if (
    req.body.main_cat !== "" &&
    req.body.sub_cat !== "" &&
    req.body.low_cat === ""
  ) {
    category = await dobaproducts.find({
      merci_main_cat: req.body.main_cat,
      merci_sub_cat: req.body.sub_cat
    }).distinct("merci_low_cat");
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  } else if(req.body.main_cat === "" &&
  req.body.sub_cat === "" &&
  req.body.low_cat === "") {
    category = await dobaproducts.distinct("merci_main_cat");
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  }

}

const updateDobaPrice = async (req, res) => {

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
     if(await dobaproducts.updateMany({
      merci_main_cat: req.body.main_cat
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  } else if (
    req.body.main_cat !== "" &&
    req.body.sub_cat !== "" &&
    req.body.low_cat === ""
  ) {
    if(await dobaproducts.updateMany({
      merci_main_cat: req.body.main_cat,
      merci_sub_cat: req.body.sub_cat,
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  } else if(req.body.main_cat !== "" &&
  req.body.sub_cat !== "" &&
  req.body.low_cat !== "") {
    if(await dobaproducts.updateMany({
      merci_main_cat: req.body.main_cat,
      merci_sub_cat: req.body.sub_cat,
      merci_low_cat: req.body.low_cat
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  }

}


const updatehHotProduct = async (req, res) => {

 
     if(await dobaproducts.updateMany({
      merci_spu_id: req.body.sku
    }, { $set : {merci_ishot: req.body.status}})){
      return res.status(200).json({ status: 200, message: 'Updated Hot ' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Hot' });
    }
}

const updatehValueProduct = async (req, res) => {

 
  if(await dobaproducts.updateMany({
   merci_spu_id: req.body.sku
 }, { $set : {merci_isValuable: req.body.status}})){
   return res.status(200).json({ status: 200, message: 'Updated Valuable ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Updated Valuable' });
 }
}



module.exports = { getAllCategories, 
  getProducts, 
  getProduct, 
  getProductBySKU, 
  getCategory,
  updateDobaPrice,
  updatehHotProduct,  
  updatehValueProduct  };
