import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css';

const LoginSignup = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store error messages
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before each submit
        try {
            if (isLogin) {
                // Login
                const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                console.log(res.data.message);

                // Store token and user role in local storage
                if (res.data.token && res.data.role) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userRole', res.data.role);
                    localStorage.setItem('userName', res.data.userName); // Save the name
                    localStorage.setItem('userId', res.data.user.id);
                    localStorage.setItem('email', res.data.user.email);
                    console.log("Role:", res.data.role); // Should log the role now
                    console.log("Name:", res.data.userName);
                    console.log("UserId:", res.data.user.id);

                    // Redirect to dashboard on successful login
                    navigate('/'); // Adjust the route based on your application structure
                } else {
                    throw new Error("Invalid response: Role or token missing");
                }
            } else {
                // Signup
                const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, phoneNumber, password });
                console.log(res.data.message);
                // Redirect to login page on successful signup
                setIsLogin(true); // Switch to login after successful signup
            }
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Incorrect email or password.";
            setError(message);
            setError(err.response?.data?.message || "An error occurred. Please try again."); // Handle specific error messages
        }
    };

    return (
        <div className="container"> {/* Apply the container class */}
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <div className="error">{error}</div>} {/* Display error message if exists */}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                {!isLogin && (
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p>
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default LoginSignup;
