import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewVehicle = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/vehicles');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div>
            <h2>Vehicles List</h2>
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle._id}>
                        <h3>{vehicle.name}</h3>
                        <p>Price per day: {vehicle.pricePerDay}</p>
                        <p>Pickup Point: {vehicle.pickupPoint}</p>
                        <p>Drop Point: {vehicle.dropPoint}</p>
                        <div>
                            {vehicle.photos.map((photo, index) => (
                                <img key={index} src={`http://localhost:5000/${photo}`} alt="Vehicle" width="100" />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewVehicle;
