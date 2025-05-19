import { useState } from "react";
import InputField from "../InputField";
import '../../styles/Toast.css'; // Import Toast CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_CUSTOMER"
    });

    const [showToast, setShowToast] = useState(false); // State for toast visibility
    const [toastContent, setToastContent] = useState({ message: '', isSuccess: false }); // State for toast content
    const navigate = useNavigate(); // Initialize navigate

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for empty fields
        if (!user.name || !user.email || !user.password || !user.role) {
            setToastContent({ message: "❌ All fields are required. Please fill out all fields.", isSuccess: false });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
            return;
        }

        try {
            const response = await fetch("http://localhost:8081/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                const errorMessage = errorData.message || "Failed to register.";
                setToastContent({ message: `❌ ${errorMessage}`, isSuccess: false });
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Success:", data);
            if (onRegister) {
                onRegister(data); // Invoke callback with response data
            }
            setToastContent({ message: "✅ Registration successful!", isSuccess: true });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <InputField
                label="Name"
                type="text"
                name="name"
                onChange={handleUpdate}
            />
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
            <label>
                Role:
                <select name="role" onChange={handleUpdate} required>
                    <option value="">Select Role</option>
                    <option value="ROLE_AGENT">Agent</option>
                    <option value="ROLE_CUSTOMER">Customer</option>
                </select>
            </label>
            <button type="submit" className="form-button">Register</button>
            <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
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

export default RegisterForm;