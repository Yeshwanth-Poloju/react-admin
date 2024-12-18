import React, { useState } from 'react';
import axios from 'axios';
import './AddVehicle.css';

const AddVehicle = () => {
    const [vehicleData, setVehicleData] = useState({
        name: '',
        pricePerDay: '',
        pickupPoint: '',
        dropPoint: '',
        termsAccepted: false,
    });
    const [photos, setPhotos] = useState([]);

    const handleChange = (e) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPhotos(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
        }
        formData.append('name', vehicleData.name);
        formData.append('pricePerDay', vehicleData.pricePerDay);
        formData.append('pickupPoint', vehicleData.pickupPoint);
        formData.append('dropPoint', vehicleData.dropPoint);
        formData.append('termsAccepted', vehicleData.termsAccepted);

        try {
            const response = await axios.post('http://localhost:5000/api/vehicles/add', formData);
            alert('Vehicle added successfully');
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h2>Add a Vehicle</h2>
                <input type="text" name="name" placeholder="Vehicle Name" value={vehicleData.name} onChange={handleChange} required />
                <input type="number" name="pricePerDay" placeholder="Price Per Day" value={vehicleData.pricePerDay} onChange={handleChange} required />
                <input type="text" name="pickupPoint" placeholder="Pickup Point" value={vehicleData.pickupPoint} onChange={handleChange} required />
                <input type="text" name="dropPoint" placeholder="Drop Point" value={vehicleData.dropPoint} onChange={handleChange} required />
                <input type="file" name="photos" multiple onChange={handleFileChange} required />
                
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="checkbox" name="termsAccepted" onChange={(e) => setVehicleData({ ...vehicleData, termsAccepted: e.target.checked })} />
                    <span style={{ marginLeft: '8px' }}>I accept the terms and conditions</span>
                </label>
                
                <button type="submit">Add Vehicle</button>
            </form>
        </div>
    );
};

export default AddVehicle;
