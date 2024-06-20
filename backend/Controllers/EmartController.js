const {emartContact} = require('../schema/emartContactSchema');
const {emartNewsLetter} = require('../schema/emartNewLetterSchema');
const {emartAddress} = require('../schema/emartAddress');
const {emartPincode} = require('../schema/emartPincode');
const newsEmail = require('../utils/NewsEmail');

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

  const sendContactReply = async (req, res) => {
    
    
  const { id, email, subject, data } = req.body;

  await newsEmail(email, subject, data)

  try {
    const updatedDocument = await emartContact.findByIdAndUpdate(
      id,
      { merci_response: data,
        merci_isOpen: true
       },
      { new: true } // Option to return the modified document
    );

    if (updatedDocument) {
      return res.status(200).json({ status: 200, message: 'Response updated successfully'});
    } else {
      return res.status(200).json({ status: 404, message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(200).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }

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

    const sendNewLetterRequest = async (req, res) => {
        const { subject, htmlMsg } = req.body;
        try {
          const contactList = await emartNewsLetter.find();
          if (contactList) {
            // Respond to the client immediately
            res.status(200).json({ status: 200, message: "Emails are being sent" });
      
            // Send emails in the background
            contactList.forEach(async (contact) => {
              await newsEmail(contact.merci_email, subject, htmlMsg);
            });
          } else {
            return res.status(200).json({ status: 400, message: "No contacts found" });
          }
        } catch (error) {
          console.error('Error finding contacts:', error);
          return res.status(200).json({ status: 500, message: "Internal Server Error" });
        }
    
      };

    const deleteNewsletterRequest = async (req, res) => {
        const { id } = req.params; // Extract the id from the request parameters
      
        try {
          const result = await emartNewsLetter.findByIdAndDelete(id); // Use findByIdAndDelete to delete the document by id
      
          if (result) {
            return res.status(200).json({ status: 200, message: 'Successfully deleted', deletedItem: result });
          } else {
            return res.status(404).json({ status: 404, message: 'Item not found' });
          }
        } catch (error) {
          return res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
        }
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
    getAddressByPincode,
    deleteNewsletterRequest,    
    sendNewLetterRequest,
    sendContactReply
  }