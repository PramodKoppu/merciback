const { percentageValues } = require('../schema/percentageSchema');


const getpercentage = async (req, res) => {
    let category;
  
      category = await bloodContacts.find({
        company: req.body.company,
      });
      if (category) {
        return res.status(200).json({ status: 200, percentageList: category });
      }
   
  };

  const addPercentage = async (req, res) => {

    const productsInstances = new cjproducts(req.body.percentage);
    cjproducts.insertMany(productsInstances)
      .then((result) => {
        return res.status(200).json({ status: 200,  message: `${result.length} products saved to the database.`});
      })
      .catch((error) => {
        return res.status(200).json({ status: 200,  message: `Error saving products to the database: ${error}`});
      });
  }


module.exports = {
  addPercentage,
  getpercentage
}

