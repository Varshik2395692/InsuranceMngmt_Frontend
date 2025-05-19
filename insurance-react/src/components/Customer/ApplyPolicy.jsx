import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './ApplyPolicy.css';
import '../../styles/Toast.css'; // Import shared Toast CSS

const ApplyPolicy = () => {
  const { userId, authToken } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [policyId, setPolicyId] = useState(location.state?.policyId || '');
  const [serialNumber] = useState(location.state?.serialNumber || '');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '', isSuccess: false }); // State for modal content

  const BASE_URL = 'http://localhost:8081/customers';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !authToken || !policyId) {
      setModalContent({
        title: 'Error',
        body: '❌ Please enter a valid Policy ID before applying.',
        isSuccess: false,
      });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/${userId}/applyPolicy/${policyId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setModalContent({
          title: 'Success',
          body: '✅ Policy applied successfully!',
          isSuccess: true,
        });
      } else {
        setModalContent({
          title: 'Error',
          body: '❌ Failed to apply for policy. Please try again.',
          isSuccess: false,
        });
      }
    } catch (error) {
      setModalContent({
        title: 'Error',
        body: '❌ An error occurred while applying for the policy.',
        isSuccess: false,
      });
    }
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
  };

  return (
    <div className="container apply-policy-container">
      <h2 className="text-center my-4">Apply for Policy #{serialNumber}</h2> {/* Display serial number */}
      <form onSubmit={handleSubmit} className="policy-form">
        <div className="form-group mb-3">
          <label htmlFor="policyId" className="form-label">Policy ID (Policy #{serialNumber}):</label> {/* Include serial number in label */}
          <input
            type="text"
            id="policyId"
            name="policyId"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            required
            className="form-control"
            placeholder={`Policy ID for Policy #${serialNumber}`} // Add serial number in placeholder
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Apply Policy</button>
      </form>
      <button className="btn btn-secondary w-100 mt-3" onClick={() => navigate(-1)}>Back</button>

      {/* Custom Toast */}
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

export default ApplyPolicy;