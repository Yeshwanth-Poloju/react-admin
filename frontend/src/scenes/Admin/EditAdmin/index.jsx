import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Optional, if you want to update the password
    const navigate = useNavigate();
    const { id } = useParams(); // Get the admin ID from the URL

    useEffect(() => {
        // Fetch the current admin data for editing
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/admins/${id}`);
                const { name, email, username } = response.data;
                setName(name);
                setEmail(email);
                setUsername(username);
            } catch (error) {
                console.error('Error fetching admin details', error);
            }
        };
        fetchAdmin();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminData = { name, email, username, password: password || undefined }; // If password is empty, do not send it

        try {
            await axios.put(`http://localhost:5000/api/admins/edit/${id}`, adminData);
            navigate('/admins'); // Redirect to the list of admins after updating
        } catch (error) {
            console.error('Error updating admin', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Admin</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Set Your New Password (Optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Update Admin</button>
        </form>
    );
};

export default EditAdmin;
