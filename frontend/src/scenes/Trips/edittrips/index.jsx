// /frontend/src/components/EditTrip.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({
    name: '',
    destination: '',
    from: '',
    to: '',
    price: '',
    detailedItinerary: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`);
        setTrip(response.data);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    fetchTrip();
  }, [tripId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/trips/${tripId}`, trip);
      navigate('/viewtrips'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Trip</h2>
      <input type="text" name="name" value={trip.name} onChange={handleChange} placeholder="Trip Name" required />
      <input type="text" name="destination" value={trip.destination} onChange={handleChange} placeholder="Destination" required />
      <input type="text" name="from" value={trip.from} onChange={handleChange} placeholder="From" required />
      <input type="text" name="to" value={trip.to} onChange={handleChange} placeholder="To" required />
      <input type="number" name="price" value={trip.price} onChange={handleChange} placeholder="Price" required />
      <textarea name="detailedItinerary" value={trip.detailedItinerary} onChange={handleChange} placeholder="Detailed Itinerary" required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTrip;
