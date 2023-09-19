const { bloodContacts } = require('../schema/bloodContactsSchema')
const { statesandcities } = require('../schema/statesandcitiesSchema');


const getContacts = async (req, res) => {
    let category;
  
      category = await bloodContacts.find({
        State: req.body.state,
        District: req.body.district,
        City: req.body.city
      });
      if (category) {
        return res.status(200).json({ status: 200, contactsList: category });
      }
   
  };
const getStatesCities = async (req, res) => {

    const list = await statesandcities.find();
    if(!list) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(list);
}


module.exports = {
    getContacts,
    getStatesCities
}

