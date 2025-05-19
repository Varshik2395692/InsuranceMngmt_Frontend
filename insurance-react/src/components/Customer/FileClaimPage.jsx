import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import axios from 'axios';
import './FileClaimPage.css'; // Import CSS for styling
 
const FileClaimPage = () => {
    const { userId, authToken } = useUserContext(); // Removed policyId from destructuring
    const navigate = useNavigate();
 
    const [formData, setFormData] = useState({
        policyID: '',
        claimAmount: '',
    });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false); // State for modal visibility
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (!userId || !authToken || !formData.policyID) {
            setMessage('❌ Please enter a valid Policy ID before applying.');
            setShowModal(true); // Show modal for error
            return;
        }
 
        try {
            console.log('Form Data:', formData); // Log the form data for debugging
            const response = await axios.patch(
                `http://localhost:8081/customers/${userId}/fileClaim`,
                formData, // ✅ Send formPayload as request body
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    withCredentials: true,
                }
            );
 
            if (response.status === 201 || response.status === 200) {
                setMessage('✅ Claim filed successfully!');
            } else {
                setMessage('❌ Failed to file the claim. Please try again.');
            }
        } catch (error) {
            setMessage('❌ An error occurred while filing the claim.');
        } finally {
            setShowModal(true); // Show modal after response
        }
    };
 
    return (
        <div className="file-claim-container">
            <h2 className="title">File a Claim</h2>
            <form onSubmit={handleSubmit} className="claim-form">
                <div className="form-group">
                    <label>Policy ID:</label>
                    <input
                        type="text"
                        name="policyID"
                        value={formData.policyID}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Claim Amount:</label>
                    <input
                        type="number"
                        name="claimAmount"
                        value={formData.claimAmount}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Submit Claim</button>
            </form>

            {/* Back Button */}
            <button
                type="button"
                className="submit-button back-button"
                onClick={() => navigate(`/customer`)}
            >
                Back
            </button>

            {/* Success/Failure Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification</h5>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        setShowModal(false);
                                        if (message.includes('✅')) navigate(`/customer`);
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default FileClaimPage;
