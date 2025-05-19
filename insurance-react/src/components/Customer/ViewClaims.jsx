import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for back button
import './ViewClaims.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ViewClaimsPage = () => {
    const { userId, authToken } = useUserContext(); // Access userId and authToken from context
    const [claims, setClaims] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const BASE_URL = 'http://localhost:8081/customers/claims/user';

    useEffect(() => {
        console.log('User ID:', userId);
        console.log('Auth Token:', authToken);

        if (!userId || !authToken) {
            setMessage('❌ User ID or authentication token is missing. Please log in again.');
            return;
        }

        const fetchClaims = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${userId}`, { // ✅ Added userId to path
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (response.status === 200) {
                    setClaims(response.data);
                } else {
                    setMessage('❌ Failed to fetch claims. Please try again.');
                }
            } catch (error) {
                setMessage('❌ An error occurred while fetching claims.');
            }
        };

        fetchClaims();
    }, [userId, authToken]);

    return (
        <div className="view-claims-container">
            <h2 className="title">Your Claims</h2>
            {message && <p className="message">{message}</p>}
            {claims.length === 0 ? (
                <p className="no-claims">No claims available.</p>
            ) : (
                <div className="row">
                    {claims.map((claim) => (
                        <div key={claim.id} className="col-md-4">
                            <div className="claim-card">
                                <h3 title={claim.claimID}>Claim ID: {claim.claimID}</h3>
                                <p title={claim.policy.policyID}>
                                    <strong>Policy ID:</strong> {claim.policy.policyID}
                                </p>
                                <p title={`$${claim.claimAmount}`}>
                                    <strong>Claim Amount:</strong> ${claim.claimAmount}
                                </p>
                                <p title={claim.policy.policyName}>
                                    <strong>Policy Name:</strong> {claim.policy.policyName}
                                </p>
                                <p title={claim.status}>
                                    <strong>Status:</strong> {claim.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default ViewClaimsPage;