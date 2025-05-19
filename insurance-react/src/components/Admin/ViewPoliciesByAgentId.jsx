import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getPoliciesByAgentId } from '../../services/UserService';
import { FaShieldAlt } from "react-icons/fa"; // Import Font Awesome icon
import './ViewPoliciesByAgentId.css';

const ViewPoliciesByAgentId = () => {
  const { userId, authToken } = useUserContext(); // ✅ Use context
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPolicies = useCallback(async () => {
    if (!userId || !authToken) {
      setErrorMessage('Agent is not logged in. Please log in to view policies.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await getPoliciesByAgentId(userId, authToken); // ✅ Pass token
      setPolicies(response);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while fetching policies.'
      );
    } finally {
      setLoading(false);
    }
  }, [userId, authToken]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  return (
    <div className="view-policies-by-agent-page">
      <h1>My Policies</h1>
      {loading && <p>Loading policies...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {policies.length > 0 ? (
        <div className="policies-grid">
          {policies.map((policy) => (
            <div className="policies-grid-item" key={policy.policyID}>
              <FaShieldAlt className="policies-grid-item-icon" />
              <h3 className="policies-grid-item-title">{policy.policyName}</h3>
              <p><strong>Premium:</strong> {policy.premiumAmount}</p>
              <p><strong>Coverage:</strong> {policy.coverageDetails}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !errorMessage && (
          <div className="no-data-emoji-container">
            <span className="no-data-emoji" role="img" aria-label="sad face">😞</span>
            <p className="no-data-message">No policies found for your account.</p>
          </div>
        )
      )}
      <div className="text-center mt-4">
        <button className="btn btn-primary back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewPoliciesByAgentId;
