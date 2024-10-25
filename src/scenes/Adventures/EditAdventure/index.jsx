// /frontend/src/components/EditAdventure.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAdventure = () => {
  const { adventureId } = useParams(); // Get the adventure ID from the URL
  const navigate = useNavigate();
  const [adventure, setAdventure] = useState({
    name: '',
    price: '',
    location: '',
    altitude: '',
    description: '',
  });

  // Fetch the adventure details when the component loads
  const fetchAdventure = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/adventures/${adventureId}`);
      setAdventure(response.data);
    } catch (error) {
      console.error('Failed to fetch adventure details:', error);
    }
  };

  useEffect(() => {
    fetchAdventure();
  }, [adventureId]);

  // Handle form input changes
  const handleChange = (e) => {
    setAdventure({
      ...adventure,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update the adventure
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/adventures/${adventureId}`, adventure);
      navigate('/viewadventures'); // Redirect to view adventures after successful update
    } catch (error) {
      console.error('Failed to update adventure:', error);
    }
  };

  return (
    <div>
      <h2>Edit Adventure</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={adventure.name}
          onChange={handleChange}
          placeholder="Adventure Name"
          required
        />
        <input
          type="number"
          name="price"
          value={adventure.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="location"
          value={adventure.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          name="altitude"
          value={adventure.altitude}
          onChange={handleChange}
          placeholder="Altitude (in meters)"
          required
        />
        <textarea
          name="description"
          value={adventure.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Update Adventure</button>
      </form>
    </div>
  );
};

export default EditAdventure;
