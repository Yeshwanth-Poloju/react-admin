import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewTreks = () => {
  const [treks, setTreks] = useState([]);
  const navigate = useNavigate();

  // Fetch all treks from the backend
  const fetchTreks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treks');
      setTreks(response.data);
    } catch (error) {
      console.error('Failed to fetch treks:', error);
    }
  };

  // Handle deleting a trek
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/treks/${id}`);
      fetchTreks(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete trek:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (trek) => {
    navigate(`/editTrek/${trek._id}`); // Redirect to the edit trek page
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  return (
    <div>
      <h2>All Treks Details</h2>
      <table>
        <thead>
          <tr>
            <th>Trek Name</th>
            <th>Altitude</th>
            <th>Pickup Point</th>
            <th>Drop Point</th>
            <th>Price Per Person</th>
            <th>Inclusions</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treks.map((trek) => (
            <tr key={trek._id}>
              <td>{trek.name}</td>
              <td>{trek.altitude} m</td>
              <td>{trek.pickupPoint}</td>
              <td>{trek.dropPoint}</td>
              <td>${trek.pricePerPerson}</td>
              <td>{trek.inclusion}</td>
              <td>{trek.description}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(trek)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(trek._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTreks;
