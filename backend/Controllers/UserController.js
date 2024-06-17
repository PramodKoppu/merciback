const { User } = require('../schema/userSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    const userList = await User.find().select('-merci_password');
    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(userList);
}

const getUser = async (req, res) => {

    const user = await User.findById(req.params.id).select('-merci_password');
    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
}  

const getShopUser = async (req, res) => {

    const user = await rooftopShop.findById(req.params.id).select('-merci_password');
    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
}  


const createUser = async (req, res) => {

    const userExist = await User.find({merci_phone: req.body.phone});
    const pancardExist = await User.find({merci_pancard: req.body.pancard});

    if(userExist.length !== 0){
        return res.status(200).json({status: 400, message: 'Phone Number Already Exsists. Please register with another number'});
    }

    if(pancardExist.length !== 0){
        return res.status(200).json({status: 400, message: 'Pancard Already Exsists. Please register with another pancard'});
    }
    

    let user = new User({
        merci_refer_id: req.body.first_name.slice(0,3).toUpperCase()+req.body.last_name.slice(0,3).toUpperCase()
        + req.body.pancard.replace(/\D/g, ""),
        merci_first_name: req.body.first_name,
        merci_middle_name: req.body.middle_name,
        merci_last_name: req.body.last_name,
        merci_email: req.body.email,
        merci_password: bcrypt.hashSync(req.body.password, 10),
        merci_phone: req.body.phone,
        merci_street_one: req.body.street_one,  
        merci_street_two: req.body.street_two,
        merci_village:req.body.village,
        merci_mandal:req.body.mandal,
        merci_district: req.body.district,
        merci_state: req.body.state,
        merci_pincode: req.body.pincode,
        merci_gender: req.body.gender,
        merci_dob: req.body.dob,
        merci_qualification: req.body.qualification,
        merci_level: req.body.level,
        merci_pancard: req.body.pancard,
        merci_aadhar: req.body.aadhar,
        merci_image: null,
        merci_refer: req.body.refer
    })
    user = await user.save();

    if(!user)
    return res.status(200).json({status: 400, message: 'the user cannot be created!'})

    res.status(200).json({status: 200, message: 'user created'});
}

const updateUser = (req, res) => {
    res.status(200).json({message : 'update user Request'})
}

const deleteUser = (req, res) => {
    res.status(200).json({message : 'Delete user Request'})
}

const userlogin = async (req,res) => {
    const user = await User.findOne({merci_phone: req.body.phone})
    if(!user) {
        return res.json({ status: 400,  message: 'Phone Number is Not Registered.'});
    }
    if(user && bcrypt.compareSync(req.body.password, user.merci_password)) {
       
        res.send({status: 200, user: user._id}) 
    } else {
       res.json({status: 401, message:'Entered Password is Wrong'});
    }
}

const shoplogin = async (req,res) => {
    const shop = await rooftopShop.findOne({merci_user_name: req.body.username})
    if(!shop) {
        return res.json({ status: 400,  message: 'Username is Not Registered.'});
    }
    if(shop && bcrypt.compareSync(req.body.password, shop.merci_password)) {
        res.send({status: 200, user: shop._id}) 
    } else {
        res.json({status: 401, message:'Entered Password is Wrong'});
    }
}

const userrefer = async (req,res) => {
    const user = await User.findOne({merci_refer_id: req.body.refer})
    if(!user) {
        return res.status(400).json({ message: 'Referer Not Found'});
    }
    return res.status(200).json({ message: 'Referer Found'});
}

const userphone = async (req,res) => {
    const user = await User.findOne({merci_phone: req.body.phone})
    if(!user) {
        return res.status(200).json({ status: 200,  message: 'Phone Not registered'});
    }
    return res.status(200).json({ status: 400, message: 'Phone is already registered. Please use another'});
}

const userpancheck = async (req,res) => {
    const user = await User.findOne({merci_pancard: req.body.pancard})
    if(!user) {
        return res.status(200).json({ status: 200,  message: 'Pancard Not registered'});
    }
    return res.status(200).json({ status: 400, message: 'Pancard is already registered. Please use another'});
}


const useraadhar = async (req,res) => {
    const user = await User.findOne({merci_aadhar: req.body.aadhar})
    if(user) {
        return res.status(200).json({ message: 'Aadhar Found'});
    }
    
    return res.status(200).json({ status: 200, message: 'Aadhar Not Found'});
}

const useridCheck = async (req,res) => {
    const user = await User.findById(req.body.id);
    if(!user) {
        return res.status(200).json({ status: 400, message: 'User Not Found'});
    }
    return res.status(200).json({ status: 200, message: 'User Found'});
}

const usersList = async (req,res) => {
    const users = await User.find({merci_refer: req.body.refer})
    if(!users) {
        return res.status(200).json({ status: 400,  message: 'No Users Registered With your Refer Id'});
    }
    return res.status(200).json({ status: 200, usersList: users});
}

const userPasswordUpdate = async (req,res) => {

    const user = await User.findById(req.body.id)

    if(user && bcrypt.compareSync(req.body.currentPassword, user.merci_password)) {
        const userUpdate = await User.updateOne({"_id": req.body.id}, {$set: {"merci_password": bcrypt.hashSync(req.body.password, 10)}})
        if(userUpdate.modifiedCount > 0){
            res.status(200).send({status: 200, message: 'Password has been changed'}) 
        } else {
            res.status(200).send({status: 400, message: 'Password cannot be updated. Please try again'})
        }
    } else {
        res.status(200).send({status: 400, message: 'Current Password is wrong. Please try again'})
    }
}

const shopPasswordUpdate = async (req,res) => {

    const user = await rooftopShop.findById(req.body.id)

    if(user && bcrypt.compareSync(req.body.currentPassword, user.merci_password)) {
        const userUpdate = await rooftopShop.updateOne({"_id": req.body.id}, {$set: {"merci_password": bcrypt.hashSync(req.body.password, 10)}})
        if(userUpdate.modifiedCount > 0){
            res.status(200).send({status: 200, message: 'Password has been changed'}) 
        } else {
            res.status(200).send({status: 400, message: 'Password cannot be updated. Please try again'})
        }
    } else {
        res.status(200).send({status: 400, message: 'Current Password is wrong.Please try again'})
    }
 
}




module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    userlogin,
    userrefer,
    userpancheck,
    useraadhar,
    useridCheck,
    userphone,
    usersList,
    shoplogin,
    getShopUser,
    userPasswordUpdate,
    shopPasswordUpdate
}

