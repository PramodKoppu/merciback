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

// const getProducts = async (req, res) => {
//   let products;

//   if (
//     req.body.main_cat !== "" &&
//     req.body.sub_cat === "" &&
//     req.body.low_cat === ""
//   ) {
//     products = await dobaproducts.find({ main_main_cat: req.body.main_cat });
//     if (products) {
//       return res.status(200).json({ status: 200, productslist: products });
//     }
//   } else if (
//     req.body.main_cat !== "" &&
//     req.body.sub_cat !== "" &&
//     req.body.low_cat === ""
//   ) {
//     products = await dobaproducts.find({
//       merci_main_cat: req.body.main_cat,
//       merci_sub_cat: req.body.sub_cat,
//     });
//     if (products) {
//       return res.status(200).json({ status: 200, productslist: products });
//     }
//   } else if (
//     req.body.main_cat !== "" &&
//     req.body.sub_cat !== "" &&
//     req.body.low_cat !== ""
//   ) {
//     products = await dobaproducts.find({
//       merci_main_cat: req.body.main_cat,
//       merci_sub_cat: req.body.sub_cat,
//       merci_low_cat: req.body.low_cat,
//     });
//     if (products) {
//       return res.status(200).json({ status: 200, productslist: products });
//     }
//   } else {
//     products = await dobaproducts.find();
//     if (products) {
//       return res.status(200).json({ status: 200, productslist: products });
//     }
//   }
// };

const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const pageSize = parseInt(req.query.pageSize) || 20; 

  let products;
  let skip = (page - 1) * pageSize;
  let totalPages;
  let totalProducts;
  
  try {
    if (
      req.body.main_cat !== "" &&
      req.body.sub_cat === "" &&
      req.body.low_cat === ""
    ) {
      products = await dobaproducts
        .find({ main_main_cat: req.body.main_cat })
        .skip(skip)
        .limit(pageSize);
       totalProducts = await dobaproducts.countDocuments({ main_main_cat: req.body.main_cat });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else if (
      req.body.main_cat !== "" &&
      req.body.sub_cat !== "" &&
      req.body.low_cat === ""
    ) {
      products = await dobaproducts
        .find({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
        })
        .skip(skip)
        .limit(pageSize);

        totalProducts = await dobaproducts.countDocuments({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
        });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else if (
      req.body.main_cat !== "" &&
      req.body.sub_cat !== "" &&
      req.body.low_cat !== ""
    ) {
      products = await dobaproducts
        .find({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
          merci_low_cat: req.body.low_cat,
        })
        .skip(skip)
        .limit(pageSize);
        totalProducts = await dobaproducts.countDocuments({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
          merci_low_cat: req.body.low_cat
        });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else {
      products = await dobaproducts.find().skip(skip).limit(pageSize);
    }

    if (products.length > 0) {
      return res.status(200).json({ status: 200, productslist: products, totalPages: totalPages, totalProducts: totalProducts });
    } else {
      return res.status(200).json({ status: 404, message: "No products found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Internal Server Error." });
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

const updateSingleDobaPrice = async (req, res) => {

  if(req.body.country === 'in') {
     if(await dobaproducts.updateOne({
      merci_spu_id: req.body.sku
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  } else {
    if(await dobaproducts.updateOne({
      merci_spu_id: req.body.sku
    }, { $set : {merci_us_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  }
  
}

const updateUSDobaPrice = async (req, res) => {

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
     if(await dobaproducts.updateMany({
      merci_main_cat: req.body.main_cat
    }, { $set : {merci_us_discount: req.body.price}})){
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
    }, { $set : {merci_us_discount: req.body.price}})){
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
    }, { $set : {merci_us_discount: req.body.price}})){
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

const deleteProduct = async (req, res) => {

  if(await dobaproducts.deleteOne({
   merci_spu_id: req.body.sku
 })){
   return res.status(200).json({ status: 200, message: 'Product Deleted ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Able to Delete Product' });
 }
}


const addProducts = async (req, res) => {


  const productsInstances = req.body.productsList.map((product) => new dobaproducts(product));
  dobaproducts.insertMany(productsInstances)
    .then((result) => {
      return res.status(200).json({ status: 200,  message: `${result.length} products saved to the database.`});
    })
    .catch((error) => {
      return res.status(200).json({ status: 200,  message: `Error saving products to the database: ${error}`});
    });
}


module.exports = { getAllCategories, 
  getProducts, 
  getProduct, 
  getProductBySKU, 
  getCategory,
  updateDobaPrice,
  updateUSDobaPrice,
  updatehHotProduct,  
  updatehValueProduct,
deleteProduct,
updateSingleDobaPrice,
addProducts  };
