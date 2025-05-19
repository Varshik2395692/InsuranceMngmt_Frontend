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
    <div className="container view-applied-policy-page">
      <h1 className="text-center my-4">My Applied Policies</h1>
      {loading && <p className="text-center">Loading policies...</p>}
      {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
      {policies.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
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
        </div>
      ) : (
        !loading && !errorMessage && <p className="text-center">No policies found for your account.</p>
      )}
      <button
        className="btn btn-secondary btn-sm mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ViewAppliedPolicy;
