// /frontend/src/components/EditTreks.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTreks = () => {
  const { trekId } = useParams(); // Get the trek ID from the URL
  const navigate = useNavigate();
  const [trek, setTrek] = useState({
    name: '',
    altitude: '',
    pickupPoint: '',
    dropPoint: '',
    pricePerPerson: '',
    inclusion: '',
    description: '',
  });

  // Fetch the trek details when the component loads
  const fetchTrek = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/treks/${trekId}`);
      setTrek(response.data);
    } catch (error) {
      console.error('Failed to fetch trek details:', error);
    }
  };

  useEffect(() => {
    fetchTrek();
  }, [trekId]);

  // Handle form input changes
  const handleChange = (e) => {
    setTrek({
      ...trek,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update the trek
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/treks/${trekId}`, trek);
      navigate('/viewtreks'); // Redirect to view treks after successful update
    } catch (error) {
      console.error('Failed to update trek:', error);
    }
  };

  return (
    <div>
      <h2>Edit Trek</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={trek.name}
          onChange={handleChange}
          placeholder="Trek Name"
          required
        />
        <input
          type="number"
          name="altitude"
          value={trek.altitude}
          onChange={handleChange}
          placeholder="Altitude (in meters)"
          required
        />
        <input
          type="text"
          name="pickupPoint"
          value={trek.pickupPoint}
          onChange={handleChange}
          placeholder="Pickup Point"
          required
        />
        <input
          type="text"
          name="dropPoint"
          value={trek.dropPoint}
          onChange={handleChange}
          placeholder="Drop Point"
          required
        />
        <input
          type="number"
          name="pricePerPerson"
          value={trek.pricePerPerson}
          onChange={handleChange}
          placeholder="Price Per Person"
          required
        />
        <input
          type="text"
          name="inclusion"
          value={trek.inclusion}
          onChange={handleChange}
          placeholder="Inclusions"
          required
        />
        <textarea
          name="description"
          value={trek.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Update Trek</button>
      </form>
    </div>
  );
};

export default EditTreks;
