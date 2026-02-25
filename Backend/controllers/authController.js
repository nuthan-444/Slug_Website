const USER = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../util/JWT.Token');




// getting user controllers
const getUserDataController = async(req,res) => {
    const _id = req.params._id;
    if(!_id) {
        return res.status(400).json({status:false,message:"id is required."});
    }

    try{
        const userData = await USER.findById(_id);
        if(!userData){
            return res.status(404).json({status:false,message:"User Not Found"});
        }

        return res.status(200).json({status:true,message:"user found",userData:userData});
    }catch(error) {
        return res.status(500).json({status:false,message:"Server error"});
    }
}



// user login controller
const loginController = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({status:false,message:"All fields are required"});
    }

    try{
        const userData = await USER.findOne({email}).select("+password");
        if(!userData){
            return res.status(404).json({status:false,message:"No user found with this email"});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,userData.password);
        
        if(isPasswordCorrect){
            return res.status(200).json({status:true,message:"Logged in successfully",token:generateToken(userData._id),userData:userData});
        }

        return res.status(400).json({status:false,message:"Wrong Password"});

    } catch(error) {
        console.log(error)
        return res.status(500).json({status:false,message:"Server error"});

    }

}




// creating user
const creatingUserController = async(req,res) => {
    let {name,srn,email,password} = req.body;
    if(!name || !srn || !email || !password){
        return res.status(400).json({status:false,message:"All fields are required"});
    }

    try {
        const isAlreadyUserExist = await USER.findOne({email});

        if(isAlreadyUserExist) {
            return res.status(400).json({status:false,message:"User already exist with this email."});
        }
        const isAlreadyUserExistWithSRN = await USER.findOne({srn});

        if(isAlreadyUserExistWithSRN) {
            return res.status(400).json({status:false,message:"User already exist with this SRN."});
        }
    

        const salt = 10;
        password = await bcrypt.hash(password,salt);

        const createUser = await USER.create({name,srn,email,password});

        return res.status(201).json({status:true,message:"Account created successfully",token:generateToken(createUser._id),userData:createUser});


    } catch(error){
        console.log(error);
        return res.status(500).json({status:false,message:"Server error"});
    }
}


// updating user
const updateUserController = async(req,res) => {
    const id = req.params.id;
    let updatedData = req.body;
    if(!updatedData.name || !updatedData.srn || !updatedData.email || !updatedData.password){
        return res.status(400).json({status:false,message:"All fields are required"});
    }

    try {
        const isAlreadyUserExist = await USER.findById(id);

        if(!isAlreadyUserExist) {
            return res.status(404).json({status:false,message:"No such user found with this email"});
        }
    
        
        const salt = 10;
        updatedData.password = await bcrypt.hash(updatedData.password,salt);

        const updateUser = await USER.findOneAndUpdate({_id:id},updatedData,{returnDocument: "after",runValidators: true});

        return res.status(201).json({status:true,message:"Account Updated successfully",token:generateToken(updateUser._id),userData:updateUser});


    } catch(error){
        console.log(error)
        return res.status(500).json({status:false,message:"Server error"});
    }
}





const deleteUserController = async(req,res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({status:false,message:"Id is not written"});
    }


    try{

        const deleteUser = await USER.findByIdAndDelete(id);

        if(deleteUser){
        return res.status(200).json({status:true,message:"deleted succussfully"});
        }
        return res.status(404).json({status:false,message:"Account Not Found"});
    }catch(error) {
        return res.status(500).json({status:false,message:"Server error"});
    }
}


module.exports = {
    getUserDataController,

    loginController,

    creatingUserController, 

    updateUserController, 

    deleteUserController
}