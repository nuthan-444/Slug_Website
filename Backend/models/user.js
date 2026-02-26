const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    srn:{
        type:String,
        unique:true,
        required:true,
        minlength:13,
        maxlength:13,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minlength:8,
        required:true,
        select: false, //to get password, have to add  User.findOne().select("+password")
    },
    banned:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        default:"user",
    }
},{
    timestamps:true,
});


module.exports = mongoose.model("User",userSchema);
