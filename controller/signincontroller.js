const signupmodel = require("../models/signupmodel");

const postsignin = async (req, res) => {
    try {
        const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
        const newuser = await signupmodel.create({ F_name, L_name, G_mail, Phonenumber, password });
        res.status(201).json({ success: true, message: 'New accound added', newuser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};  


const signinusers = async (req, res) => {
    try {
        const signups = await signupmodel.find({});
        console.log(signups);
        res.status(200).json({ success: true, signups });
    } catch (err) {
        console.error("Error in signinusers:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

const getidsignup=  async (req, res) => {
    try {
        const user = await signupmodel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


//  edit profile info 
const editprofile=  async (req, res) => {
    try {
        const { F_name, L_name, G_mail, Phonenumber, password } = req.body;
        const updatedUser = await signupmodel.findByIdAndUpdate(
            req.params.id,
            { F_name, L_name, G_mail, Phonenumber, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, message: 'user updated', updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const  deleteprofile= async (req, res) => {
    try {
        const deletedUser = await signupmodel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        res.status(200).json({ success: true, message: 'user deleted' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports ={postsignin ,signinusers,getidsignup,editprofile,deleteprofile};