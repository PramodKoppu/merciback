const {emartContact} = require('../schema/emartContactSchema');
const {emartNewsLetter} = require('../schema/emartNewLetterSchema');

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


  module.exports = {
    addContactRequest,
    getContactRequest,
    addNewsLetterRequest,
    getNewLetterRequest
  }