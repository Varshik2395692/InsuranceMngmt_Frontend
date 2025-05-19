import React, { useEffect, useState } from "react";
import "./ViewPolicies.css"; // Optional: Add a CSS file for styling
import { getAllPolicies } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa"; // Import Font Awesome icon

function ViewPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        console.log("Fetching policies...");
        const response = await getAllPolicies();
        console.log("Response data:", response); // Debugging
        setPolicies(response || []); // Ensure policies is always an array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policies:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading policies...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="view-policies-container">
      <h1 className="view-policies-title">Available Policies</h1>
      {Array.isArray(policies) && policies.length === 0 ? (
        <p>No policies available.</p>
      ) : (
        <div className="policies-grid">
          {Array.isArray(policies) &&
            policies.map((policy) => (
              <div className="policies-grid-item" key={policy.policyId}>
                <FaShieldAlt className="policies-grid-item-icon" />
                <h3 className="policies-grid-item-title">{policy.policyName}</h3>
                <p><strong>Premium:</strong> {policy.premiumAmount}</p>
                <p><strong>Coverage:</strong> {policy.coverageDetails}</p>
                <p><strong>Validity:</strong> {policy.validityPeriod}</p>
              </div>
            ))}
        </div>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default ViewPolicies;