require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendFeedback = (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: `${email}`,
    subject: 'Feedback from ' + name,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: 'Error sending email' });
    } else {
      res.send({ message: 'Email sent successfully' });
    }
  });
};