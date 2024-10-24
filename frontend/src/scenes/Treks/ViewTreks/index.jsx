import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ViewTreks = () => {
  const [treks, setTreks] = useState([]);
  const [expandedTrekId, setExpandedTrekId] = useState(null); // State to track which trek's description is expanded
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

  // Toggle expanded description
  const toggleDescription = (id) => {
    setExpandedTrekId(expandedTrekId === id ? null : id);
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
            <th>Photo</th>
            <th>Trek Name</th>
            <th>Drop Point</th>
            <th>Price Per Person</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {treks.map((trek) => (
            <tr key={trek._id}>
              <td>
                {trek.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${photo}`} // Adjust the URL as needed
                    alt={`Trek ${index + 1}`}
                    style={{ width: '50px', height: '50px', margin: '5px' }} // Adjust size and margin as needed
                  />
                ))}
              </td>
              <td>{trek.name}</td>
              <td>{trek.dropPoint}</td>
              <td>${trek.pricePerPerson}</td>
              <td style={{ maxWidth: "600px" }}>
                {expandedTrekId === trek._id ? (
                  <>
                    <p>{trek.description}</p>
                    <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(trek._id)}>Show Less</p> </b>
                  </>
                ) : (
                  <>
                    <p>{trek.description.substring(0, 100)}...</p>
                    <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(trek._id)}>See More</p> </b>
                  </>
                )}
              </td>
              <td>
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={() => handleEdit(trek)}
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
                  <IconButton onClick={() => handleDelete(trek._id)}
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

export default ViewTreks;
