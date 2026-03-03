const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.APP_PASSWORD}`,
            // user:"sapthagirinpsuniversityslug@gmail.com",
            // pass:"cjsn axfi rhit dlzl"
    },
});

module.exports = {transporter}
