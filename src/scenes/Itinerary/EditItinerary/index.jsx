// /frontend/src/components/EditItinerary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditItinerary = () => {
  const { itineraryId } = useParams(); // Get the itinerary ID from the URL
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState({
    name: '',
    price: '',
    totalDays: '',
    pickup: '',
    drop: '',
    description: '',
    photos: [], // Store existing photos
  });
  const [newPhotos, setNewPhotos] = useState([]); // For new photos to upload

  // Fetch the itinerary details when the component loads
  const fetchItinerary = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/itineraries/${itineraryId}`);
      setItinerary(response.data);
    } catch (error) {
      console.error('Failed to fetch itinerary details:', error);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [itineraryId]);

  // Handle form input changes
  const handleChange = (e) => {
    setItinerary({
      ...itinerary,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input for new photos
  const handleFileChange = (e) => {
    setNewPhotos(e.target.files);
  };

  // Handle form submission to update the itinerary
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', itinerary.name);
    formData.append('price', itinerary.price);
    formData.append('totalDays', itinerary.totalDays);
    formData.append('pickup', itinerary.pickup);
    formData.append('drop', itinerary.drop);
    formData.append('description', itinerary.description);

    // Append any new photos to the form data
    Array.from(newPhotos).forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      await axios.put(`http://localhost:5000/api/itineraries/${itineraryId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/viewitineraries'); // Redirect to view itineraries after successful update
    } catch (error) {
      console.error('Failed to update itinerary:', error);
    }
  };

  return (
    <div>
      <h2>Edit Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={itinerary.name}
          onChange={handleChange}
          placeholder="Itinerary Name"
          required
        />
        <input
          type="number"
          name="price"
          value={itinerary.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="totalDays"
          value={itinerary.totalDays}
          onChange={handleChange}
          placeholder="Total Days"
          required
        />
        <input
          type="text"
          name="pickup"
          value={itinerary.pickup}
          onChange={handleChange}
          placeholder="Pickup Point"
          required
        />
        <input
          type="text"
          name="drop"
          value={itinerary.drop}
          onChange={handleChange}
          placeholder="Drop Point"
          required
        />
        <textarea
          name="description"
          value={itinerary.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        
        {/* Display existing photos */}
        <div>
          <h4>Existing Photos:</h4>
          <div className="photo-gallery">
            {itinerary.photos && itinerary.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Itinerary ${index + 1}`} className="itinerary-photo" />
            ))}
          </div>
        </div>
        
        {/* Upload new photos */}
        <input type="file" multiple onChange={handleFileChange} />

        <button type="submit">Update Itinerary</button>
      </form>
    </div>
  );
};

export default EditItinerary;
