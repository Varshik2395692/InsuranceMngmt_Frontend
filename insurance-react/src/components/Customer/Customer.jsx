import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import '../Customer/Customer.css';
import { FaUser, FaFileAlt, FaClipboardList, FaPlusCircle, FaListAlt, FaFileInvoiceDollar } from 'react-icons/fa';

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function Customer() {
    const navigate = useNavigate();
    const { userRole, userName, setUserRole, setUserName, setUserId, setAuthToken } = useUserContext();

    useEffect(() => {
        if (!userRole || userRole !== "ROLE_CUSTOMER") {
            navigate("/loginform");
        }
    }, [userRole, navigate]);

    const handleLogout = () => {
        setUserRole(null);
        setUserName(null);
        setUserId(null);
        setAuthToken(null);
        navigate("/");
    };

    return (
        <div className="customer-dashboard">
            {/* Sidebar Section */}
            <div className="customer-sidebar">
                <h2>Customer Portal</h2>
                <p className="customer-name"><strong>Welcome,</strong> {userName || "Valued Customer"}</p> {/* Added class for styling */}
                <button className="home-button" onClick={() => navigate('/home')}>Home</button> {/* Updated navigation path */}
                <button className="logout-button" onClick={handleLogout}>Sign Out</button>
            </div>

            {/* Main Content Section */}
            <div className="customer-main-content">
                <h1>Dashboard</h1>
                <div className="card-container">
                    <div className="card">
                        <div className="card-content">
                            <FaUser className="card-icon" />
                            <div>
                                <h3>Profile</h3>
                                <p>{truncateText("Manage your personal details.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/Customer/CustomerProfile')}>View Profile</button>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <FaFileAlt className="card-icon" />
                            <div>
                                <h3>Policies</h3>
                                <p>{truncateText("Explore available insurance policies.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/Customer/Policies')}>View Policies</button>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <FaClipboardList className="card-icon" />
                            <div>
                                <h3>Claims</h3>
                                <p>{truncateText("Monitor your claim status.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/customer/view-claims')}>Track Claims</button>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <FaPlusCircle className="card-icon" />
                            <div>
                                <h3>New Policy</h3>
                                <p>{truncateText("Apply for a new insurance policy.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/Customer/apply-policy')}>Apply Now</button>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <FaListAlt className="card-icon" />
                            <div>
                                <h3>Applied Policies</h3>
                                <p>{truncateText("Review your submitted applications.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/customer/view-applied-policies')}>View Applications</button>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <FaFileInvoiceDollar className="card-icon" />
                            <div>
                                <h3>Submit Claim</h3>
                                <p>{truncateText("File a claim for your policy.", 30)}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/customer/file-claim')}>File Claim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Customer;
