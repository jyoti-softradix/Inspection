require("dotenv").config();
const sgMail = require('@sendgrid/mail');

export const sendMail = async(to,subject,htmlContent) =>{
    try{
        const sgMailTransfer = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: to, // Replace with the recipient's email address
            from: process.env.SENDGRID_MAIL_FROM,   // Replace with the sender's email address
            subject: subject,
            html: htmlContent,
          };
          
          sgMailTransfer.send(msg)
            .then(() => {
              console.log('Email sent successfully');
            })
            .catch((error) => {
              console.error('Error sending email:', error.toString());
            });
          
    }catch(error){
        console.log("Server Error-->", error)
    }
}
