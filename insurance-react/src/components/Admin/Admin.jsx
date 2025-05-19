import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import '../Admin/Admin.css';
import { FaHome, FaUser, FaFileAlt, FaCog, FaUsers, FaClipboardList, FaPlusCircle, FaChartBar } from 'react-icons/fa';

function Admin() {
    const navigate = useNavigate();
    const { userRole, userName, setUserRole, setUserName, setUserId, setAuthToken } = useUserContext();

    useEffect(() => {
        if (!userRole || (userRole !== "ROLE_ADMIN" && userRole !== "ROLE_AGENT")) {
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
        <div className="admin-dashboard container-fluid">
            <div className="row">
                {/* Sidebar Section */}
                <div className="col-md-3 admin-sidebar bg-dark text-white">
                    <div className="text-center py-4">
                        <h2>Admin Panel</h2>
                        <p><strong>Welcome:</strong> {userName || "Admin"}</p>
                        <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-dark text-white" onClick={() => navigate('/home')}>
                            <FaHome className="me-2" /> Home
                        </li>
                        <li className="list-group-item bg-dark text-white" onClick={() => navigate('/admin/dashboard')}>
                            <FaClipboardList className="me-2" /> Dashboard
                        </li>
                        <li className="list-group-item bg-dark text-white" onClick={() => navigate('/admin/manage-users')}>
                            <FaUsers className="me-2" /> Manage Users
                        </li>
                        <li className="list-group-item bg-dark text-white" onClick={() => navigate('/admin/reports')}>
                            <FaChartBar className="me-2" /> Reports
                        </li>
                        <li className="list-group-item bg-dark text-white" onClick={() => navigate('/admin/settings')}>
                            <FaCog className="me-2" /> Settings
                        </li>
                    </ul>
                </div>

                {/* Main Content Section */}
                <div className="col-md-9 admin-main-content">
                    <h1 className="text-center my-4">Admin Dashboard</h1>
                    <div className="row g-4">
                        {/* Cards */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaUser className="card-icon mb-3" />
                                    <h5 className="card-title">Update Customer Details</h5>
                                    <p className="card-text">Modify customer or policy information.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/update-details')}>Update Details</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaUsers className="card-icon mb-3" />
                                    <h5 className="card-title">Customer Directory</h5>
                                    <p className="card-text">Access all registered customers.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/view-customers')}>View Customers</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaFileAlt className="card-icon mb-3" />
                                    <h5 className="card-title">Policy Overview</h5>
                                    <p className="card-text">Browse all available policies.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/view-policies')}>View Policies</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaPlusCircle className="card-icon mb-3" />
                                    <h5 className="card-title">Create New Policy</h5>
                                    <p className="card-text">Add a new insurance policy.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/add-policy')}>Add Policy</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaClipboardList className="card-icon mb-3" />
                                    <h5 className="card-title">Claims Status</h5>
                                    <p className="card-text">Track the status of claims.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/view-claims-by-status')}>View Claims</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column text-center">
                                    <FaChartBar className="card-icon mb-3" />
                                    <h5 className="card-title">Agent Policies</h5>
                                    <p className="card-text">View policies managed by agents.</p>
                                    <button className="btn btn-primary mt-auto" onClick={() => navigate('/admin/view-policies-by-agent')}>View Policies</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
