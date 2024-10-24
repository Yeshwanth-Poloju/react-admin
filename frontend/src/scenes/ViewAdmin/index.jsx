import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                                <button onClick={() => handleEdit(admin._id)}>Edit</button>
                                <button onClick={() => handleDelete(admin._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAdmin;
