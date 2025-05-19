import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Policies.css";
import "../../styles/Toast.css"; // Import shared Toast CSS
import { getAllPolicies } from "../../services/UserService";

function ViewPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleApply = (policyId, serialNumber) => {
    navigate(`/customer/apply-policy`, { state: { policyId, serialNumber } });
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await getAllPolicies();
        setPolicies(response || []);
      } catch (err) {
        setError("Failed to fetch policies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading policies...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="view-policies-container">
      <h1>Available Policies</h1>
      {policies.length === 0 ? (
        <p>No policies available at the moment.</p>
      ) : (
        <div className="policies-grid">
          {policies.map((policy, index) => (
            <div key={policy.policyId || index} className="policy-card">
              <div className="policy-number">#{index + 1}</div> {/* Display serial number */}
              <h3>{policy.policyName}</h3>
              <p><strong>Premium:</strong> {policy.premiumAmount}</p>
              <p><strong>Coverage:</strong> {policy.coverageDetails}</p>
              <p><strong>Validity:</strong> {policy.validityPeriod}</p>
              <button
                className="apply-button"
                onClick={() => handleApply(policy.policyId, index + 1)} // Pass serial number
                title="Apply for this policy" // Tooltip for full text
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        title="Go back" // Tooltip for full text
      >
        Back
      </button>
    </div>
  );
}

export default ViewPolicies;