const {Verification_Email_Template, Welcome_Email_Template,Event_Registration_Email_Template} = require("./emailTemplate");
const { transporter } = require("./email.config");


const sendVerificationCode = async(email,verificationCode) => {
const info = await transporter.sendMail({
            from: `"Slug at Sapthagiri nps university" <${process.env.EMAIL}>`,
            to: email,
            subject: "Verification code",
            text: "Verification code", // Plain-text version of the message
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // HTML version of the message
});
}



const welcomeEmailMessage = async(email,name) => {
const info = await transporter.sendMail({
            from: `"Slug at Sapthagiri nps university" <${process.env.EMAIL}>`,
            to: email,
            subject: "Welcome to Slug",
            text: "Welcome to Slug", // Plain-text version of the message
            html: Welcome_Email_Template.replace("{name}",name), // HTML version of the message
});
}


const eventRegistrationMessage = async(email, name, eventName, eventDate, eventLocation) => {
const info = await transporter.sendMail({
            from: `"Slug at Sapthagiri nps university" <${process.env.EMAIL}>`,
            to: email,
            subject: "Registration Confirmed",
            text: "Registration Confirmed", // Plain-text version of the message
            html: Event_Registration_Email_Template.replace("{name}",name).replace("{eventName}",eventName).replace("{eventDate}",eventDate).replace("{eventLocation}",eventLocation) // HTML version of the message
});
}
module.exports = {sendVerificationCode,welcomeEmailMessage,eventRegistrationMessage}