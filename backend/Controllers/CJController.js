const { cjcategory } = require("../schema/cjcategorySchema");
const { cjproducts } = require("../schema/cjProductsSchema");

const getAllCategories = async (req, res) => {
  let category;

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
    category = await cjcategory.find({
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
    category = await cjcategory.find({
      merci_company: "doba",
      main_category: req.body.main_cat,
      sub_category: req.body.sub_cat,
    });
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  } else {
    category = await cjcategory.find();
    if (category) {
      return res.status(200).json({ status: 200, categorylist: category });
    }
  }
};


// const tryParseJSON = (jsonString) => {
//   console.log('str', jsonString);
//   try {
//     const obj = JSON.parse(jsonString);
//     if (obj && typeof obj === 'object') {
//       return obj;
//     }
//   } catch (e) {
//     // not a JSON string
//   }
//   return jsonString;
// };

const addProducts = async (req, res) => {

  // console.log('prod', req.body.productsList);

  
    // const modifiedData = req.body.productsList.map(row => {
    //   console.log('json', row.merci_material);
    //   row.merci_prod_images = tryParseJSON(row.merci_prod_images);
    //   row.merci_material = tryParseJSON(row.merci_material);
    //   row.merci_subprod = tryParseJSON(row.merci_subprod);
    //   return row;
    // });

    // console.log('prod', modifiedData);

  // const productsInstances = req.body.productsList.map((product) => new cjproducts(product));
  
  const productsList = req.body.productsList.map(product => ({
    merci_main_cat: product.merci_main_cat,
    merci_sub_cat: product.merci_sub_cat,
    merci_low_cat: product.merci_low_cat,
    merci_spu_id: product.merci_spu_id,
    merci_prod_name: product.merci_prod_name,
    merci_mrp: product.merci_mrp,
    merci_prod_img: product.merci_prod_images, // Ensure the field name matches the schema
    merci_ishot: product.merci_ishot,
    merci_merci_discount: product.merci_merci_discount,
    merci_us_discount: product.merci_us_discount,
    merci_isValuable: product.merci_isValuable,
    merci_variantKey: product.merci_variant_key, // Ensure the field name matches the schema
    merci_subProd: product.merci_subprod, // Ensure the field name matches the schema
  }));

  cjproducts.insertMany(productsList)
    .then((result) => {
      return res.status(200).json({ status: 200,  message: `${result.length} products saved to the database.`});
    })
    .catch((error) => {
      return res.status(200).json({ status: 200,  message: `Error saving products to the database: ${error}`});
    });

}


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
      products = await cjproducts
        .find({ merci_main_cat: req.body.main_cat })
        .skip(skip)
        .limit(pageSize);
       totalProducts = await cjproducts.countDocuments({ merci_main_cat: req.body.main_cat });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else if (
      req.body.main_cat !== "" &&
      req.body.sub_cat !== "" &&
      req.body.low_cat === ""
    ) {
      products = await cjproducts
        .find({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
        })
        .skip(skip)
        .limit(pageSize);

        totalProducts = await cjproducts.countDocuments({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
        });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else if (
      req.body.main_cat !== "" &&
      req.body.sub_cat !== "" &&
      req.body.low_cat !== ""
    ) {
      products = await cjproducts
        .find({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
          merci_low_cat: req.body.low_cat,
        })
        .skip(skip)
        .limit(pageSize);
        totalProducts = await cjproducts.countDocuments({
          merci_main_cat: req.body.main_cat,
          merci_sub_cat: req.body.sub_cat,
          merci_low_cat: req.body.low_cat
        });
       totalPages = Math.ceil(totalProducts / pageSize);
    } else {
      products = await cjproducts.find().skip(skip).limit(pageSize);
    }

    if (products.length > 0) {
      return res.status(200).json({ status: 200, company: 'cj', productslist: products, totalPages: totalPages, totalProducts: totalProducts });
    } else {
      return res.status(200).json({ status: 404, message: "No products found." });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal Server Error." });
  }
};

const getInitialProducts = async (req, res) => {
  const allProducts = await cjcategory.find()
  const uni = [...new Set(allProducts.map(item => item.main_cat))]
  let allpro = [];
  await Promise.all(uni.map(async (category) => {
      const products = await cjproducts.find({ merci_main_cat: category }).limit(25);
      allpro.push(...products);
  }));
  return  res.status(200).json({status: 200, allPro : allpro });
}



const getProduct = async (req, res) => {
  const product = await cjproducts.findById(req.params.id);
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};

const getProductBySKU = async (req, res) => {
  const product = await cjproducts.find({merci_spu_id: req.body.sku});
  if (product) {
    return res.status(200).json({ status: 200, productslist: product });
  }
};

// const getCategory = async (req, res) => {

//   let category;

//   if (
//     req.body.main_cat !== "" &&
//     req.body.sub_cat === "" &&
//     req.body.low_cat === ""
//   ) {
//     category = await cjproducts.find({
//       merci_main_cat: req.body.main_cat
//     }).distinct("merci_sub_cat");
//     if (category) {
//       return res.status(200).json({ status: 200, categorylist: category });
//     }
//   } else if (
//     req.body.main_cat !== "" &&
//     req.body.sub_cat !== "" &&
//     req.body.low_cat === ""
//   ) {
//     category = await cjproducts.find({
//       merci_main_cat: req.body.main_cat,
//       merci_sub_cat: req.body.sub_cat
//     }).distinct("merci_low_cat");
//     if (category) {
//       return res.status(200).json({ status: 200, categorylist: category });
//     }
//   } else if(req.body.main_cat === "" &&
//   req.body.sub_cat === "" &&
//   req.body.low_cat === "") {
//     category = await cjproducts.distinct("merci_main_cat");
//     if (category) {
//       return res.status(200).json({ status: 200, categorylist: category });
//     }
//   }

// }

const updateCJPrice = async (req, res) => {

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
     if(await cjproducts.updateMany({
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
    if(await cjproducts.updateMany({
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
    if(await cjproducts.updateMany({
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

const updateSingleCJPrice = async (req, res) => {

  if(req.body.country === 'in') {
     if(await cjproducts.updateOne({
      merci_spu_id: req.body.sku
    }, { $set : {merci_merci_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  } else {
    if(await cjproducts.updateOne({
      merci_spu_id: req.body.sku
    }, { $set : {merci_us_discount: req.body.price}})){
      return res.status(200).json({ status: 200, message: 'Updated Price' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Price' });
    }
  }
  
}

const updateUSCJPrice = async (req, res) => {

  if (
    req.body.main_cat !== "" &&
    req.body.sub_cat === "" &&
    req.body.low_cat === ""
  ) {
     if(await cjproducts.updateMany({
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
    if(await cjproducts.updateMany({
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
    if(await cjproducts.updateMany({
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

 
     if(await cjproducts.updateMany({
      merci_spu_id: req.body.sku
    }, { $set : {merci_ishot: req.body.status}})){
      return res.status(200).json({ status: 200, message: 'Updated Hot ' });
    }else{
      return res.status(200).json({ status: 400, message: 'Not Updated Hot' });
    }
}

const updatehValueProduct = async (req, res) => {

 
  if(await cjproducts.updateMany({
   merci_spu_id: req.body.sku
 }, { $set : {merci_isValuable: req.body.status}})){
   return res.status(200).json({ status: 200, message: 'Updated Valuable ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Updated Valuable' });
 }
}


const deleteProduct = async (req, res) => {

  if(await cjproducts.deleteOne({
   merci_spu_id: req.body.sku
 })){
   return res.status(200).json({ status: 200, message: 'Product Deleted ' });
 }else{
   return res.status(200).json({ status: 400, message: 'Not Able to Delete Product' });
 }
}



module.exports = { getAllCategories, 
  addProducts,
  getProducts, 
  getProduct, 
  getProductBySKU, 
  // getCategory,
  updateCJPrice,
  updateUSCJPrice,
  updatehHotProduct,  
  updatehValueProduct,
  deleteProduct,
  updateSingleCJPrice,
  getInitialProducts
};
