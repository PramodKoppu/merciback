const { UserGlobal } = require('../schema/userGlobalSchema');
const { rooftopShop } = require('../schema/rooftopShopSchema');
const sendEmail = require('../utils/EmailConfig');
const forgetemail = require('../constants/ForgetPassword');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    const userList = await UserGlobal.find().select('-merci_password');
    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(userList);
}

const getUser = async (req, res) => {

    const { id } = req.params;

    const user = await UserGlobal.findById(id).select('-merci_password');
    if(!user) {
        return res.status(500).json({message: 'The user with the given Phone Number was not found.'})
    } 
   return res.status(200).send(user);
}  


const getUserByPhone = async (req, res) => {

    const { phone } = req.body;

    const user = await UserGlobal.findOne({merci_phone: phone}).select('-merci_password');
    if(!user) {
        return res.status(500).json({message: 'The user with the given Phone Number was not found.'})
    } 
   return res.status(200).send(user);
}  


const createUser = async (req, res) => {

    const userExist = await UserGlobal.find({merci_phone: req.body.phone});

    if(userExist.length !== 0){
        return res.status(200).json({status: 400, message: 'Phone Number Already Exsists. Please register with another number'});
    }


    let user = new UserGlobal({
        merci_full_name: req.body.fullName,
        merci_email: req.body.email,
        merci_password: bcrypt.hashSync(req.body.password, 10),
        merci_phone: req.body.phone,
        merci_street_one: req.body.street_one,  
        merci_street_two: req.body.street_two,
        merci_district: req.body.district,
        merci_state: req.body.state,
        merci_pincode: req.body.pincode,
        merci_gender: req.body.gender,
        merci_dob: req.body.dob,
        merci_image: null
    })
    user = await user.save();

    if(!user)
    return res.status(200).json({status: 400, message: 'the user cannot be created!'})

    res.status(200).json({status: 200, message: 'user created'});
}

// const updateUser = (req, res) => {
//     res.status(200).json({message : 'update user Request'})
// }

// const deleteUser = (req, res) => {
//     res.status(200).json({message : 'Delete user Request'})
// }

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { newData } = req.body;

    try {
        const updatedUser = await UserGlobal.findByIdAndUpdate(id, newData, { new: true }).select('-merci_password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).send('Your Details Has Been Update');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await UserGlobal.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const userlogin = async (req,res) => {
    const user = await UserGlobal.findOne({merci_phone: req.body.phone})
    if(!user) {
        return res.json({ status: 400,  message: 'Phone Number is Not Registered.'});
    }
    if(user && bcrypt.compareSync(req.body.password, user.merci_password)) {
       
        res.send({status: 200, user: user._id}) 
    } else {
       res.json({status: 401, message:'Entered Password is Wrong'});
    }
}


const userphone = async (req,res) => {
    const user = await UserGlobal.findOne({merci_phone: req.body.phone})
    if(!user) {
        return res.status(200).json({ status: 200,  message: 'Phone Not registered'});
    }
    return res.status(200).json({ status: 400, message: 'Phone is already registered. Please use another'});
}

const userPasswordUpdate = async (req,res) => {

    const user = await UserGlobal.findById(req.body.id)

    if(user && bcrypt.compareSync(req.body.currentPassword, user.merci_password)) {
        const userUpdate = await UserGlobal.updateOne({"_id": req.body.id}, {$set: {"merci_password": bcrypt.hashSync(req.body.password, 10)}})
        if(userUpdate.modifiedCount > 0){
            const sub = 'Password Changed Successfully';
            const htmlMsg = '<p>Dear Member, Password for your account has been changed successfully. If not done by you, then change password immediately.</p>';
            const emmsg = await sendEmail(user.merci_email, sub, htmlMsg); 
            res.status(200).send({status: 200, message: 'Password has been changed'}) 
        } else {
            res.status(200).send({status: 400, message: 'Password cannot be updated. Please try again'})
        }
    } else {
        res.status(200).send({status: 400, message: 'Current Password is wrong. Please try again'})
    }
}

const userPasswordUpdatebyEmail = async (req,res) => {

    const userUpdate = await UserGlobal.updateOne({"_id": req.body.id}, {$set: {"merci_password": bcrypt.hashSync(req.body.password, 10)}})
    if(userUpdate.modifiedCount > 0){
        res.status(200).send({status: 200, message: 'Password has been changed'}) 
    } else {
        res.status(200).send({status: 400, message: 'Password cannot be updated. Please try again'})
    }
    
}

const userPasswordEmail = async (req,res) => {

    const user = await UserGlobal.findOne({merci_phone: req.body.phone});

    const subject = 'Password Change Request'
    const htmlMsg = forgetemail(user._id);
    const response = await sendEmail(user.merci_email, subject, htmlMsg);

    if(response) {
        res.status(200).send({status: 200, message: 'An email has been sent to change password. Please check your email id'})
    } else {
        res.status(200).send({status: 400, message: 'Not able to send email. Please try again after few minutes'})
    }
}


const forgotPassword = async (req, res) => {
    try {
        console.log('body', req.body);

        const { phone } = req.body;

        // Find user by phone number
        const user = await UserGlobal.findOne({ merci_phone: phone });

        if (!user) {
            return res.status(400).send({ status: 400, message: 'Phone number not found. Please try again' });
        }

        const userId = user._id;
        const resetLink = `https://www.merciemart.com/resetpassword/${userId}`;

        // Email details
        const subject = 'Password Reset Request';
        const htmlMsg = `
            <p>Dear Member,</p>
            <p>We received a request to reset your password. Please click the link below to reset your password:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>If you did not request this change, please ignore this email.</p>
            <p>MerciMart Support Team</p>
        `;

        // Send email
        const emailSent = await sendEmail(user.merci_email, subject, htmlMsg);

        if (emailSent) {
            return res.status(200).send({ status: 200, message: 'Reset password link has been sent to your email' });
        } else {
            return res.status(500).send({ status: 500, message: 'Failed to send email. Please try again later' });
        }
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).send({ status: 500, message: 'Internal server error' });
    }
};


const resetPassword = async (id, password) => {
    try {
        // Validate password strength
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return { status: 400, message: "Password must be at least 8 characters, include 1 uppercase letter and 1 number." };
        }

        // Find user by ID
        const user = await UserGlobal.findById(id);
        if (!user) {
            return { status: 400, message: "User not found." };
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Update password in database
        const updateResult = await UserGlobal.updateOne(
            { _id: id },
            { $set: { merci_password: hashedPassword } }
        );

        if (updateResult.modifiedCount > 0) {
            return { status: 200, message: "Password reset successfully!" };
        } else {
            return { status: 400, message: "Failed to reset password. Please try again." };
        }

    } catch (error) {
        console.error("Error in resetPassword:", error);
        return { status: 500, message: "Internal server error." };
    }
};


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    userlogin,
    userphone,
    userPasswordUpdate,
    getUserByPhone,
    userPasswordEmail,
    userPasswordUpdatebyEmail,
    forgotPassword,
    resetPassword,
}

