import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const ViewAdventure = () => {
  const [adventures, setAdventures] = useState([]);
  const [expandedAdventureId, setExpandedAdventureId] = useState(null); // State to track which trek's description is expanded
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

  const toggleDescription = (adventureId) => {
    setExpandedAdventureId(expandedAdventureId === adventureId ? null : adventureId);
  };

  return (
    <div>
      <h1>Adventures</h1>
      <table>
        <thead>
          <tr>
            {/* <tr>Photo</tr> */}
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
              <td style={{ maxWidth: "600px" }}>
                {expandedAdventureId === adventure._id
                  ? (
                    <>
                      <p>{adventure.description}</p>
                      <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(adventure._id)}>Show Less</p> </b>

                    </>
                  )
                  : (
                    <>
                      <p>{adventure.description.substring(0, 100)}...</p>
                      <b> <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => toggleDescription(adventure._id)}>See More</p> </b>


                    </>
                  )
                }
              </td>
              <td>
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={() => handleEdit(adventure)}
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
                  <IconButton onClick={() => handleDelete(adventure._id)}
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

export default ViewAdventure;
