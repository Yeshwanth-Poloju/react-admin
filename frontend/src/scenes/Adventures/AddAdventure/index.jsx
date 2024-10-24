import React, { useState } from 'react';
import axios from 'axios';

const AddAdventure = ({ onAdventureAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    location: '',
    altitude: '',
    description: '',
    photos: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === 'photos') {
        Array.from(formData.photos).forEach((photo) => data.append('photos', photo));
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      await axios.post('http://localhost:5000/api/adventures/add', data);
      alert('Adventure added successfully!');
      onAdventureAdded(); // Call the callback to navigate or refresh
    } catch (error) {
      console.error('Failed to add adventure:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleInputChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleInputChange} required />
      <input type="text" name="location" placeholder="Location" onChange={handleInputChange} required />
      <input type="number" name="altitude" placeholder="Altitude" onChange={handleInputChange} required />
      <textarea name="description" placeholder="Description" onChange={handleInputChange} required></textarea>
      <input type="file" name="photos" multiple onChange={handleFileChange} required />
      <button type="submit">Add Adventure</button>
    </form>
  );
};

export default AddAdventure;
