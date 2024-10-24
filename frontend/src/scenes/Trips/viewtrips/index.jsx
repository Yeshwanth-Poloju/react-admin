// /frontend/src/components/ViewTrips.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewtrip.css'; // Import the CSS file

const ViewTrips = ({ onEdit, onDelete }) => {
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

  return (
    <div>
      <h2>All Trips Details</h2>
      <table>
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Destination</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Actions</th>
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
                <button className="edit-button" onClick={() => onEdit(trip)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(trip._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTrips;
