const jwt = require("jsonwebtoken");
const USER = require("../models/user");

// generates new token
const generateToken = (_id) => {
    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};


const verifyToken = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token provided"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await USER.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "User not found"
      });
    }

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token expired"
      });
    }

    return res.status(401).json({
      status: false,
      message: "Invalid token"
    });
  }
};



module.exports = {generateToken , verifyToken};