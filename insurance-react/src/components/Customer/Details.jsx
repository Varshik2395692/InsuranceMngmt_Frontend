import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './Details.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaUserCircle } from 'react-icons/fa'; // Import user icon

const UpdateDetailsPage = () => {
    const { userId, authToken } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [updatedDetails, setUpdatedDetails] = useState(null); // State for updated details
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [modalContent, setModalContent] = useState({ title: '', body: '', isSuccess: false }); // State for modal content

    const BASE_URL = 'http://localhost:8081/customers';

    const fetchUserDetails = useCallback(async () => {
        if (userId && authToken) {
            try {
                const response = await axios.get(`${BASE_URL}/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                if (response.status === 200) {
                    setFormData({
                        name: response.data.name || '',
                        email: response.data.email || '',
                        phone: response.data.phone || '',
                        password: '', // Do not pre-fill the password for security reasons
                    });
                    setUpdatedDetails(response.data); // Set initial details in the left section
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
    }, [userId, authToken]); // Wrap in useCallback and add dependencies

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]); // Use the memoized fetchUserDetails function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!formData.name.trim()) {
            alert('❌ Name cannot be empty.');
            return;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            alert('❌ Please enter a valid email address.');
            return;
        }
        if (!formData.phone.trim() || !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
            alert('❌ Please enter a valid phone number.');
            return;
        }
        if (!formData.password.trim() || formData.password.length < 6) {
            alert('❌ Password must be at least 6 characters long.');
            return;
        }

        if (!userId || !authToken) {
            alert('❌ User ID or authentication token is missing. Please log in again.');
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/update/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 201) {
                setModalContent({
                    title: 'Success',
                    body: '✅ Details updated successfully!',
                    isSuccess: true,
                });
                setUpdatedDetails(formData); // Update details in the left section
            } else {
                setModalContent({
                    title: 'Error',
                    body: '❌ Failed to update details. Please try again.',
                    isSuccess: false,
                });
            }
        } catch (error) {
            setModalContent({
                title: 'Error',
                body: '❌ An error occurred. Please try again.',
                isSuccess: false,
            });
        }
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
    };

    return (
        <div className="update-details-layout">
            {/* Left section */}
            <div className="profile-portal">
                <div className="profile-card">
                    <div className="profile-icon">
                        {/* User icon */}
                        <FaUserCircle className="profile-icon-img" />
                    </div>
                    <div className="profile-details">
                        <h3 className="profile-name">{updatedDetails?.name || 'N/A'}</h3>
                        <p className="profile-email"><strong>Email:</strong> {updatedDetails?.email || 'N/A'}</p>
                        <p className="profile-phone"><strong>Phone:</strong> {updatedDetails?.phone || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="right-section">
                <div className="form-container">
                    <h2 className="title">Update Details</h2>
                    <form onSubmit={handleSubmit} className="details-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-input form-control"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input form-control"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="form-input form-control"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-input form-control"
                                placeholder="Enter a new password"
                            />
                        </div>
                        <button type="submit" className="submit-button btn btn-primary btn-block mb-3">Update Details</button>
                    </form>
                    <div className="form-group">
                        <button 
                            className="btn btn-secondary btn-block" 
                            onClick={() => navigate(-1)} // Navigate back to the previous page
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for success or error messages */}
            {showModal && (
                <div className="custom-toast">
                    <div className={`toast-content ${modalContent.isSuccess ? 'toast-success' : 'toast-error'}`}>
                        <strong>{modalContent.title}</strong>
                        <p>{modalContent.body}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateDetailsPage;
