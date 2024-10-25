// /backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');
const authRoutes = require('./routes/authRoutes');
const trekRoutes = require('./routes/trekRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const adventureRoutes = require('./routes/adventureRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const payment = require('./routes/payment');


const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));
app.use('/api/admins', adminRoutes); // Admin route

app.use('/api', tripRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', trekRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/adventures', adventureRoutes);
// Use itinerary routes
app.use('/api', itineraryRoutes);

app.use('/api/payment',payment);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
