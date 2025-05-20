import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './AuthPage.css'; // Import the CSS file
import { useUserContext } from '../../context/UserContext'; // Corrected import path
import { useNavigate } from 'react-router-dom'; // Add this import

const LOGIN_API_BASE_URL = 'http://localhost:8099/api/auth'; // Login API base URL
const REGISTER_API_BASE_URL = 'http://localhost:8081'; // Register API base URL

// Reusable Input Component
const InputField = ({ label, type, name, value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
};

// Login Form Component
const LoginForm = ({ onLogin }) => {
    const { setUserRole, setUserName, setUserId, setAuthToken } = useUserContext(); // Access the context
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${LOGIN_API_BASE_URL}/login`, user);
            console.log("Success:", response.data);
            setUserRole(response.data.role);
            setUserName(response.data.name);
            setUserId(response.data.userId);
            setAuthToken(response.data.token); // Store the token in context

            onLogin(response.data); // Pass the entire user data, including the role
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputField
                label="Email"
                type="email"
                name="email"
                onChange={handleUpdate}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                onChange={handleUpdate}
            />
            <button type="submit" className="form-button">Login</button>
        </form>
    );
};

// Register Form Component
const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const [errors, setErrors] = useState({}); // State for field-specific error messages

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

        // Clear specific field error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: ""
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        const newErrors = {};
        if (!user.name) newErrors.name = "Name is required.";
        if (!user.email) newErrors.email = "Email is required.";
        if (!user.password) newErrors.password = "Password is required.";
        if (!user.role) newErrors.role = "Role is required.";

        setErrors(newErrors);

        // Stop submission if there are validation errors
        if (Object.keys(newErrors).length > 0) return;

        try {
            // Check if email already exists
            const emailCheckResponse = await axios.get(`${REGISTER_API_BASE_URL}/users/${user.email}`);
            if (emailCheckResponse.data) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email already exists. Please use a different email."
                }));
                return;
            }

            // Proceed with registration
            const response = await axios.post(`${REGISTER_API_BASE_URL}/register`, user);
            console.log("Success:", response.data);
            onRegister(); // Notify parent of successful registration
        } catch (error) {
            console.error("Error:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: error.response?.data?.message || "Failed to register."
            }));
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleUpdate}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleUpdate}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleUpdate}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <div className="input-group">
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleUpdate}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="ROLE_CUSTOMER">Customer</option>
                    <option value="ROLE_AGENT">Agent</option>
                </select>
                {errors.role && <p className="error-text">{errors.role}</p>}
            </div>
            {errors.form && <p className="error-text">{errors.form}</p>}
            <button type="submit" className="form-button">Register</button>
        </form>
    );
};

// Add CSS for left-aligned error messages
const styles = `
    .error-text {
        color: red;
        font-size: 0.9rem;
        margin-top: 4px;
        text-align: left;
    }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Main App Component
const AuthPage = ({ showLogin, showRegister, onLoginSuccess, onRegisterSuccess }) => {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleLoginSubmit = (data) => {
        onLoginSuccess(data);
    };

    const handleRegisterSubmit = () => {
        onRegisterSuccess();
    };

    return (
        <div className="auth-page">
            {!showLogin && !showRegister && (
                <div className="auth-buttons">
                    <button className="auth-button" onClick={() => { onLoginSuccess(false); }}>Login</button>
                    <button className="auth-button" onClick={() => { onRegisterSuccess(false); }}>Register</button>
                </div>
            )}
            {showLogin && (
                <div className="forms-container">
                    <LoginForm onLogin={handleLoginSubmit} />
                    <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            )}
            {showRegister && (
                <div className="forms-container">
                    <RegisterForm onRegister={handleRegisterSubmit} />
                    <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
                </div>
            )}
        </div>
    );
};

export default AuthPage;