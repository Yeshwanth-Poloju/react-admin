// /backend/controllers/AuthController.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Load your secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // Check if the provided credentials match the hardcoded ones
  if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Create a token payload (you can add more data here if needed)
    const payload = {
        email: ADMIN_USERNAME,
    };

    // Generate the token using the secret key
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

    // Return the token in the response
    console.log(token)
    res.status(200).json({
      message: 'Login successful',
      token, // Send token in the response
      
    }
    
);
  } else {
    // Return an error if the credentials don't match
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
