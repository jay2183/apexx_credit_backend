require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const OTP_STORAGE = {}; // Temporary store for OTPs (use Redis for production)

// Nodemailer setup
const transporter = nodemailer.createTransport({
    // service: "gmail",
    // auth: {
       
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD
    // }
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 465, // 587 for TLS, 465 for SSL
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Generate OTP function
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via email
exports.sendOTP = async (req, res) => {
    const { email } = req.body;
   console.log("email ==",email);
   
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    OTP_STORAGE[email] = otp; // Store OTP in-memory

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code For APEXX CREDIT App",
        
        text: `${otp} is your OTP for registering APEXX CREDIT mobile app. Do not share it with anyone.`,
        html: `<p>Your OTP code is <b>${otp}</b></p>`
    };
   console.log("sender email ==",process.env.EMAIL,
 process.env.EMAIL_PASSWORD);
//  let info = await transporter.sendMail(mailOptions);
//  console.log('Email sent: %s', info.messageId);
    transporter.sendMail(mailOptions, (err, info) => {
        console.log("error sending mail==",err);
        
        if (err) return res.status(500).json({ message: "Error sending OTP", error: err });
        res.json({ message: `OTP sent successfully on ${email}.` });
    });
};

// Verify OTP and register user
exports.verifyOTP = async (req, res) => {
    const { name, email, otp } = req.body;

    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    if (OTP_STORAGE[email] !== otp) return res.status(400).json({ message: "Invalid OTP" });

    delete OTP_STORAGE[email]; // Remove OTP after successful verification

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ name, email });
        await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Email ${email} verified`,
        text: `Email verified successfully from Apexx Credit App`,
        text: `Dear Customer, APEXX CREDIT app successfully enabled`,
        
    };
    transporter.sendMail(mailOptions)
    res.json({ message: "Email verified successfully", token:token ,userId:user._id,email:email });
};
