import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext'; // Import UserContext
import './AuthPage.css'; // Import CSS for styling
import '../../styles/Toast.css'; // Import Toast CSS

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

const LoginForm = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const { setUserId, setUserName, setUserEmail, setUserRole, setAuthToken } = useUserContext(); // Use context setters
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const [showToast, setShowToast] = useState(false); // State for toast visibility
    const [toastContent, setToastContent] = useState({ message: '', isSuccess: false }); // State for toast content

    const handleUpdate = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8099/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                const errorMessage = errorData.message || "Login failed. Please try again.";
                setToastContent({ message: `❌ ${errorMessage}`, isSuccess: false });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Backend Response:", data);

            if (!data.userId || !data.token) {
                throw new Error("Invalid response from server");
            }

            // Store user details in context
            setUserId(data.userId);
            setUserName(data.name);
            setUserEmail(data.email);
            setUserRole(data.role);
            setAuthToken(data.token);

            setToastContent({ message: "✅ Login successful!", isSuccess: true });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                // Navigate based on user role
                if (data.role === "ROLE_AGENT") {
                    navigate('/admin');
                } else if (data.role === "ROLE_CUSTOMER") {
                    navigate('/customer');
                } else {
                    alert("Unauthorized role");
                }
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <InputField label="Email" type="email" name="email" value={user.email} onChange={handleUpdate} />
            <InputField label="Password" type="password" name="password" value={user.password} onChange={handleUpdate} />
            <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
            <button type="submit" className="form-button">Login</button>
            {showToast && (
                <div className="custom-toast">
                    <div className={`toast-content ${toastContent.isSuccess ? 'toast-success' : 'toast-error'}`}>
                        {toastContent.message}
                    </div>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
