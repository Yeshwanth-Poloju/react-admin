const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel');

// Load environment variables
dotenv.config();

// Load your secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up
// Signup
exports.signup = async (req, res) => {
    const { name, email, phoneNumber, password, role } = req.body;
    try {
        const user = new User({
            name,
            email,
            phoneNumber,
            password, // Hash password here if using bcrypt
            role: 'user' // Default role, or assign based on your logic
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { // Replace with bcrypt comparison if needed
            return res.status(400).json({ message: "Invalid email or password" });
        }
        console.log("User found:", user);

        // Create a token payload
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Make sure to define JWT_SECRET in your environment variables

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role,
            userName: user.name,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role // Include user role in the response
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
