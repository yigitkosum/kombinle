const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing application/json
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Example route to handle user creation
app.post('/api/users', (req, res) => {
  const user = req.body;
  // Handle the user data, such as saving it to a database
  console.log('User data received:', user);
  res.status(201).send({ message: 'User created successfully' });
});

// Route to send verification email
app.post('/api/sendVerificationEmail', (req, res) => {
  const { email, code } = req.body;

  const mailOptions = {
    from: 'mehmetserhat86895@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: `Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ message: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.send({ message: 'Verification email sent successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
