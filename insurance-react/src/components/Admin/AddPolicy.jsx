import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import './AddPolicy.css'; // Import custom CSS
import '../../styles/Toast.css'; // Import Toast CSS

const AddPolicy = () => {
    const { userId, authToken, setPolicyId, policyId } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        policyName: '',
        premiumAmount: '',
        coverageDetails: '',
        validityPeriod: '',
    });
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [modalContent, setModalContent] = useState({ title: '', body: '', isSuccess: false }); // State for modal content

    const BASE_URL = 'http://localhost:8081/agents';

    useEffect(() => {
        console.log('User ID:', userId);
        console.log('Auth Token:', authToken);
        console.log('Policy ID:', policyId);
    }, [userId, authToken, policyId]);

    if (!userId) {
        return <p className="error-message">❌ Error: User ID is not available. Please log in again.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'validityPeriod' && value !== '' && !/^\d*$/.test(value)) {
            setModalContent({
                title: 'Error',
                body: '❌ Validity Period must be a number.',
                isSuccess: false,
            });
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
            return;
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !authToken) {
            setModalContent({
                title: 'Error',
                body: '❌ User ID or authentication token is missing. Please log in again.',
                isSuccess: false,
            });
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
            return;
        }
        try {
            const response = await axios.post(
                `${BASE_URL}/${userId}/addpolicy`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                console.log('Policy added successfully:', response.data);
                setModalContent({
                    title: 'Success',
                    body: '✅ Policy added successfully!',
                    isSuccess: true,
                });
                setFormData({ policyName: '', premiumAmount: '', coverageDetails: '', validityPeriod: '' });
                setTimeout(() => navigate(`/admin`), 2000);
                setPolicyId(response.data.policyID);
            } else {
                setModalContent({
                    title: 'Error',
                    body: '❌ Failed to add policy. Please try again.',
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
        <div className="add-policy-container">
            <h2 className="title">Add Policy</h2>
            <div className="form-box">
                <form onSubmit={handleSubmit} className="policy-form">
                    <div className="form-group">
                        <label>Policy Name:</label>
                        <input
                            type="text"
                            name="policyName"
                            value={formData.policyName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Premium Amount:</label>
                        <input
                            type="number"
                            name="premiumAmount"
                            value={formData.premiumAmount}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Coverage Details:</label>
                        <textarea
                            name="coverageDetails"
                            value={formData.coverageDetails}
                            onChange={handleChange}
                            required
                            className="form-input"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Validity Period (in years):</label>
                        <input
                            type="text"
                            name="validityPeriod"
                            value={formData.validityPeriod}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter validity in years (e.g., 1, 2, 5)"
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Policy</button>
                </form>
            </div>
            <button className="back-button" onClick={() => navigate('/admin')}>Back</button>
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

export default AddPolicy;
