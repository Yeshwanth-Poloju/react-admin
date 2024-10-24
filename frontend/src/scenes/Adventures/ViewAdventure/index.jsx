import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewAdventure = () => {
  const [adventures, setAdventures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/adventures');
        setAdventures(response.data);
      } catch (error) {
        console.error('Failed to fetch adventures:', error);
      }
    };

    fetchAdventures();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/adventures/${id}`);
      setAdventures(adventures.filter(adventure => adventure._id !== id));
    } catch (error) {
      console.error('Failed to delete adventure:', error);
    }
  };

  const handleEdit = (adventure) => {
    navigate(`/editAdventure/${adventure._id}`); // Redirect to the edit adventure page
  };

  return (
    <div>
      <h1>Adventures</h1>
      <table>
        <thead>
          <tr>
            <th>Adventure Name</th>
            <th>Price</th>
            <th>Location</th>
            <th>Altitude</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adventures.map(adventure => (
            <tr key={adventure._id}>
              <td>{adventure.name}</td>
              <td>${adventure.price}</td>
              <td>{adventure.location}</td>
              <td>{adventure.altitude} m</td>
              <td>{adventure.description}</td>
              <td>
                <button onClick={() => handleEdit(adventure)}>Edit</button>
                <button onClick={() => handleDelete(adventure._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAdventure;
