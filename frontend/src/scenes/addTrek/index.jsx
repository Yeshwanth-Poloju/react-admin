import React, { useState } from 'react';
import axios from 'axios';

const AddTrek = ({ onTrekAdded }) => {
  const [name, setName] = useState('');
  const [altitude, setAltitude] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [inclusion, setInclusion] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('altitude', altitude);
    formData.append('pickupPoint', pickupPoint);
    formData.append('dropPoint', dropPoint);
    formData.append('pricePerPerson', pricePerPerson);
    formData.append('inclusion', inclusion);
    formData.append('description', description);
    
    // Append each file to form data
    Array.from(photos).forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      await axios.post('http://localhost:5000/api/treks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onTrekAdded(); // Notify parent component
    } catch (error) {
      console.error('Failed to add trek:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Trek</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trek Name" required />
      <input type="number" value={altitude} onChange={(e) => setAltitude(e.target.value)} placeholder="Altitude (meters)" required />
      <input type="text" value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} placeholder="Pickup Point" required />
      <input type="text" value={dropPoint} onChange={(e) => setDropPoint(e.target.value)} placeholder="Drop Point" required />
      <input type="number" value={pricePerPerson} onChange={(e) => setPricePerPerson(e.target.value)} placeholder="Price Per Person" required />
      <input type="text" value={inclusion} onChange={(e) => setInclusion(e.target.value)} placeholder="Inclusions" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTrek;
