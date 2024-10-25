import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Payment } from '@mui/icons-material';
import './tripDashboard.css';

const ViewTrips = () => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handlePayment = async (tripId) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment', { tripId });
      
      const options = {
        key:"rzp_test_USUKqObpxVODG3", // Replace with your Razorpay Key ID
        amount: data.price, // Amount is in paise (100 paise = 1 INR)
        currency: 'INR',
        name: "Yeshwanth Transaction",
        description: 'Trip Payment',
        image: 'https://example.com/your_logo.jpg', // Optional logo
        order_id: data.id, // Order ID generated by Razorpay
        handler: function (response) {
          // You can call your backend to verify the payment and save it in your database
          console.log(response);
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: '', // Customer Name
          email: '', // Customer Email
          contact: '' // Customer Contact Number
        },
        notes: {
          tripId: tripId // Send tripId with the payment for reference
        },
        theme: {
          color: '#F37254' // Customize the theme color
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  return (
    <div className="table-container">
      <h2>All Trips Details</h2>
      <table>
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Destination</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.name}</td>
              <td>{trip.destination}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.price}</td>
              <td>
                <Payment 
                  style={{ cursor: 'pointer', color: 'green' }} 
                  onClick={() => handlePayment(trip._id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTrips;
