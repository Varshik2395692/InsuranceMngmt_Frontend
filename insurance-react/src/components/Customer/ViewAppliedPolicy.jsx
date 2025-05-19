import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getAllPoliciesByCustomerId } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import './ViewAppliedPolicy.css';

const ViewAppliedPolicy = () => {
  const { userId, authToken } = useUserContext();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchPolicies = useCallback(async () => {
    if (!userId || !authToken) {
      setErrorMessage('Customer is not logged in. Please log in to view policies.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await getAllPoliciesByCustomerId(userId, authToken);
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
    if (userId) {
      fetchPolicies();
    }
  }, [userId, fetchPolicies]);

  return (
    <div className="view-applied-policy-container">
      <h1 className="text-center my-4">My Applied Policies</h1>
      {loading && <p className="text-center">Loading policies...</p>}
      {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
      {policies.length > 0 ? (
        <div className="policies-grid">
          {policies.map((policy, index) => (
            <div key={policy.policyID || index} className="policy-card">
              <div className="policy-number">#{index + 1}</div>
              <h3>{policy.policyName}</h3>
              <p><strong>Premium:</strong> {policy.premiumAmount}</p>
              <p><strong>Coverage:</strong> {policy.coverageDetails}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !errorMessage && <p className="text-center">No policies found for your account.</p>
      )}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        title="Go back"
      >
        Back
      </button>
    </div>
  );
};

export default ViewAppliedPolicy;
