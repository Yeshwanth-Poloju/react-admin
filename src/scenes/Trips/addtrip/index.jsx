// /frontend/src/components/AddTrips.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './addtrips.css'; // Import the CSS file

const AddTrips = ({ onTripAdded }) => {
  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState('');
  const [detailedItinerary, setDetailedItinerary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/trips', {
        name,
        destination,
        from,
        to,
        price,
        detailedItinerary,
      });
      onTripAdded(); // Notify the parent to refresh the trip list
      setName('');
      setDestination('');
      setFrom('');
      setTo('');
      setPrice('');
      setDetailedItinerary('');
    } catch (error) {
      console.error('Failed to add trip:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add Trip</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Trip Name"
        required
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        required
      />
      <input
        type="text"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
        required
      />
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <textarea
        value={detailedItinerary}
        onChange={(e) => setDetailedItinerary(e.target.value)}
        placeholder="Detailed Itinerary"
        required
      />
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrips;
