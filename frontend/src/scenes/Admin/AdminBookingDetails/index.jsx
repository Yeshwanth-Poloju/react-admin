// components/AdminBookingDetails.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookingDetails = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/bookings/admin/bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Booking Details</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item Type</th>
                        <th>Item Name</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Payment Amount</th>
                        <th>Payment Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.itemType}</td>
                            <td>{booking.itemName}</td>
                            <td>{booking.user ? booking.user.name : 'N/A'}</td>
                            <td>{booking.user ? booking.user.email : 'N/A'}</td>
                            <td>{booking.price}</td>
                            <td>{booking.paymentStatus}</td>
                            <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookingDetails;
