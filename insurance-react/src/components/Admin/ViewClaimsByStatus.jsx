import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { getClaimsByStatus, updateClaimStatus } from '../../services/UserService';
import { useNavigate } from 'react-router-dom'; // ✅ Add navigation for back button
import './ViewClaimsByStatus.css';

const ViewClaimsByStatus = () => {
  const { authToken } = useUserContext();
  const [status, setStatus] = useState('');
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      console.log('Fetching claims with status:', status); // ✅ Debugging log
      const response = await getClaimsByStatus(status, authToken);
      console.log('API Response:', response); // ✅ Debugging log
      if (response && Array.isArray(response)) {
        setClaims(response);
      } else {
        throw new Error('Invalid response format from API.');
      }
    } catch (error) {
      console.error('Error fetching claims:', error); // ✅ Debugging log
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while fetching claims.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (claimId, newStatus) => {
    try {
      const claim = claims.find((claim) => claim.claimID === claimId);
      if (!claim) {
        setErrorMessage('Claim not found.');
        return;
      }

      const updateClaimStatusDTO = {
        policyID: claim.policy?.policyID || 0,
        status: newStatus,
      };

      console.log('Updating claim status:', updateClaimStatusDTO); // ✅ Debugging log
      await updateClaimStatus(claimId, updateClaimStatusDTO, authToken);
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.claimID === claimId ? { ...claim, status: newStatus } : claim
        )
      );
    } catch (error) {
      console.error('Error updating claim status:', error); // ✅ Debugging log
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while updating the claim status.'
      );
    }
  };

  return (
    <section className="container mt-4">
      <h1 className="text-center mb-4">View Claims by Status</h1>
      <div className="card p-4 mb-4"> {/* ✅ Ensure card wraps content */}
        <form onSubmit={handleSearch} className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="status" className="form-label">Select Status:</label>
          </div>
          <div className="col-auto">
            <select
              id="status"
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>-- Select Status --</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </form>

        {loading && <p className="text-center mt-3">Loading claims...</p>}
        {errorMessage && <p className="text-danger text-center mt-3">{errorMessage}</p>}

        {claims.length > 0 ? (
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Claim ID</th>
                  <th>Claim Amount</th>
                  <th>Policy ID</th>
                  <th>Customer ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.claimID}>
                    <td>{claim.claimID}</td>
                    <td>{claim.claimAmount}</td>
                    <td>{claim.policy?.policyID || 'N/A'}</td>
                    <td>{claim.customer?.userId || 'N/A'}</td>
                    <td>{claim.status}</td>
                    <td>
                      {claim.status === 'Pending' && (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleUpdateStatus(claim.claimID, 'Accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleUpdateStatus(claim.claimID, 'Rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && !errorMessage && <p className="text-center mt-3">No claims found for the given status.</p>
        )}
      </div>

      <div className="text-center mt-4"> {/* ✅ Ensure back button is at the bottom */}
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </div>
    </section>
  );
};

export default ViewClaimsByStatus;
