import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ViewAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admins');
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admins/delete/${id}`); // Corrected endpoint
            fetchAdmins(); // Refresh the list
        } catch (error) {
            console.error('Error deleting admin', error);
        }
    };


    const handleEdit = (id) => {
        navigate(`/editadmin/${id}`);
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div>
            <h2>Admin List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin._id}>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.username}</td>
                            <td>
                                <Tooltip title="Edit" placement="top">
                                    <IconButton onClick={() => handleEdit(admin._id)}
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
                                    <IconButton
                                        onClick={() => handleDelete(admin._id)}
                                        sx={{
                                            color: 'inherit',
                                            '&:hover': {
                                                color: 'red', // Change color on hover
                                            },
                                        }}
                                    >
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

export default ViewAdmin;
