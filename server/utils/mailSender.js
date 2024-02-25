const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await mailSender.sendMail({
      from: '"Agermax" <no-reply@agermax.com>', // sender address
      to, 
      subject, // Subject line
      text, // plain text body
      html, // HTML body content
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
