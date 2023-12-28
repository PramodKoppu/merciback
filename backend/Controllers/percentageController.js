const { percentageValues } = require('../schema/percentageSchema');


const getpercentage = async (req, res) => {
  
      const category = await percentageValues.find({
        company: req.body.company,
      });
      if (category) {
        return res.status(200).json({ status: 200, percentageList: category });
      }
  };

  const addPercentage = async (req, res) => {

    try {
      const filter = { company: req.body.company };
      const updateInstance = new percentageValues(req.body.update);
  
      const result = await percentageValues.updateOne(filter, updateInstance);
  
      if (result.nModified === 0) {
        // If no document was modified, it means no record was found with merci_company equal to 'cj'
        return res.status(404).json({ status: 404, message: 'No matching record found.' });
      }
  
      return res.status(200).json({ status: 200, message: 'Product updated successfully.' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: `Error updating product: ${error.message}` });
    }
  }


module.exports = {
  addPercentage,
  getpercentage
}

