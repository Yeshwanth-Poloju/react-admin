import React, { useState } from 'react';
import axios from 'axios';

const AddItinerary = ({ onItineraryAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('totalDays', totalDays);
    formData.append('pickup', pickup);
    formData.append('drop', drop);
    formData.append('description', description);

    // Append each file to form data
    Array.from(photos).forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      await axios.post('http://localhost:5000/api/itineraries', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onItineraryAdded(); // Notify parent component
    } catch (error) {
      console.error('Failed to add itinerary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an Itinerary</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Itinerary Name"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <input
        type="number"
        value={totalDays}
        onChange={(e) => setTotalDays(e.target.value)}
        placeholder="Total Days"
        required
      />
      <input
        type="text"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        placeholder="Pickup Point"
        required
      />
      <input
        type="text"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
        placeholder="Drop Point"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddItinerary;
