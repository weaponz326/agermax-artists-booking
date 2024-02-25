const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // Note: Set to false if you are using port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await mailSender.sendMail({
      from: '"Agermax" <no-reply@agermax.com>', // Sender address
      to,
      subject, 
      text, 
      html, 
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};

module.exports = sendEmail;
