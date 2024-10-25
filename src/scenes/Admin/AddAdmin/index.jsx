import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addadmin.css';

const AddAdmin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adminData = { name, email, username, password, phoneNumber };

        try {
            await axios.post('http://localhost:5000/api/admins/add', adminData);
            navigate('/admins'); // Redirect to admin list
        } catch (error) {
            console.error('Error adding admin', error);
        }
    };

    const handleSendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/admins/send-otp', { phoneNumber });
            setIsOtpSent(true);
            alert('OTP sent to your phone number.');
        } catch (error) {
            console.error('Error sending OTP', error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admins/verify-otp', {
                phoneNumber,
                otp
            });

            if (response.data.message === 'OTP verified successfully') {
                setIsOtpVerified(true);
                alert('OTP verified successfully. You can now submit the form.');
            }
        } catch (error) {
            console.error('Error verifying OTP', error);
            alert('Invalid or expired OTP.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Add Admin</h2>
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
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <small style={{ float: 'right', cursor: 'pointer', color: 'white' }} onClick={handleSendOtp} disabled={isOtpSent}>
                    Verify Number
                </small>
                {isOtpSent && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={{ marginRight: '10px' }} // Add space between input and button
                        />
                        <button type="button" onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    </div>
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={!isOtpVerified}>
                    Add Admin
                </button>
            </form>
        </div>
    );
};

export default AddAdmin;
