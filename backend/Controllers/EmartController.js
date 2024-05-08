const {emartContact} = require('../schema/emartContactSchema');
const {emartNewsLetter} = require('../schema/emartNewLetterSchema');
const {emartAddress} = require('../schema/emartAddress');
const {emartPincode} = require('../schema/emartPincode');

const addContactRequest = async (req, res) => {
  let contactRequest = new emartContact({
    merci_name: req.body.name,
    merci_email: req.body.email,
    merci_phone: req.body.phone,
    merci_subject: req.body.subject,
    merci_description: req.body.description,
    merci_response: '',
    merci_isOpen: false
})
addRequest = await contactRequest.save();

if(addRequest)
return res.status(200).json({status: 200, message: 'Your message has been received. We will contact you back soon!!!'})

res.status(200).json({status: 400, message: 'Not able to place request. Please try after some time.'});
};


const getContactRequest = async (req, res) => {
    contactList = await emartContact.find();
    if (contactList) {
      return res.status(200).json({ status: 200, contactList: contactList });
    }
    return res.status(400).json({ status: 200, message: 'There is an error' });

  };


  const addNewsLetterRequest = async (req, res) => {
    let newsLetterRequest = new emartNewsLetter({
      merci_email: req.body.email,
  })
  addRequest = await newsLetterRequest.save();
  
  if(addRequest)
  return res.status(200).json({status: 200, message: 'Thankyou for subscribing to us'})
  
  res.status(200).json({status: 400, message: 'Not able to add. Please try after some time.'});
  };
  
  
  const getNewLetterRequest = async (req, res) => {
      contactList = await emartNewsLetter.find();
      if (contactList) {
        return res.status(200).json({ status: 200, contactList: contactList });
      }
      return res.status(400).json({ status: 200, message: 'There is an error' });
  
    };

const createAddress =  async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new emartAddress(userData);
        const savedUser = await newUser.save();
        res.status(200).json({status: 200, message: 'Address Added Successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllAddress = async (req, res) => {
    try {
        const users = await emartAddress.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAddressById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await emartAddress.find({merci_id : req.params.id});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await emartAddress.findByIdAndUpdate(userId, userData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({status: 200, message:'Address has been Updated'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

 const  deleteAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await emartAddress.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(200).json({ status: 400, message: 'Address not found' });
        }
        res.status(200).json({ status: 200, message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAddressByPincode = async (req, res) => {
    try {
        const pincode = req.params.pincode;
        const address = await emartPincode.find({pincode : pincode});
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


  module.exports = {
    addContactRequest,
    getContactRequest,
    addNewsLetterRequest,
    getNewLetterRequest,
    createAddress,
    getAllAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAddressByPincode
  }