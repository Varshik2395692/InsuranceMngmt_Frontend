import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faSpinner, faExclamationCircle, faUser } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import "./ViewCustomers.css";

function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/customers/customer/all");
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <p>Loading customers...</p>
        <div className="text-center mt-4">
          <button className="btn btn-primary back-button" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        <FontAwesomeIcon icon={faExclamationCircle} /> Error: {error}
        <div className="text-center mt-4">
          <button className="btn btn-primary back-button" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-customers-container container mt-5">
      <h1 className="text-center mb-4">Customer List</h1>
      {customers.length === 0 ? (
        <div className="alert alert-warning text-center" role="alert">
          <div className="no-data-emoji-container">
            <span className="no-data-emoji" role="img" aria-label="sad face">😞</span>
          </div>
          <p className="no-data-message">No customers available.</p>
        </div>
      ) : (
        <div className="grid-container">
          {customers.map((customer) => (
            <div className="grid-item" key={customer.id}>
              <FontAwesomeIcon icon={faUser} className="grid-item-icon" />
              <h5>{customer.name}</h5>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Address:</strong> {customer.address}</p>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        <button className="btn btn-primary back-button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ViewCustomers;