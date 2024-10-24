// /frontend/src/components/ViewTrips.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './viewtrip.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const ViewTrips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();


  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trips');
      setTrips(response.data);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    }
  };

  // Handle deleting a trek
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`);
      fetchTrips(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete trip:', error);
    }
  };

  // Handle edit button click
  const onEdit = (trip) => {
    navigate(`/editTrips/${trip._id}`); // Redirect to the edit trek page
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <h2>All Trips Details</h2>
      <table>
        <thead>
          <tr>
            <th>Trip Name</th>
            <th>Destination</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.name}</td>
              <td>{trip.destination}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.price}</td>
              <td>
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={() => onEdit(trip)}
                    sx={{
                      color: 'inherit',
                      '&:hover': {
                        color: 'blue', // Change color on hover
                      },
                    }}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="bottom">
                  <IconButton onClick={() => onDelete(trip._id)}
                    sx={{
                      color: 'inherit',
                      '&:hover': {
                        color: 'red', // Change color on hover
                      },
                    }}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTrips;
