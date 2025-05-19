import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getPoliciesByAgentId } from '../../services/UserService';
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
        <table className="policies-table">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy Name</th>
              <th>Premium</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.policyID}>
                <td>{policy.policyID}</td>
                <td>{policy.policyName}</td>
                <td>{policy.premiumAmount}</td>
                <td>{policy.coverageDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
