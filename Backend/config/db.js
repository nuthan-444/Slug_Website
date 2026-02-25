const mongoose = require("mongoose");


const connectDB = async() => {
    try {   
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/Slug`);
        console.log("MONGODB CONNECTED");
        console.log(`MONGODB CONNECTED TO ${process.env.MONGODB_URL}/Slug`);
    }catch(error){
        console.log("MONGOOSE CONNECTION ERROR "+error);
        exit(1);
    }
}


module.exports = connectDB;