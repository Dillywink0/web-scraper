// lib/email.js
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
}));

export const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};
