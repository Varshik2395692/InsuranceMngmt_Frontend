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

    const [errors, setErrors] = useState({}); // State for field-specific error messages
    const navigate = useNavigate(); // Initialize navigate

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
            const emailCheckResponse = await fetch(`http://localhost:8081/users/${user.email}`);
            if (!emailCheckResponse.ok) {
                console.error("Failed to check email existence:", emailCheckResponse.statusText);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Unable to verify email. Please try again later."
                }));
                return;
            }

            const emailExists = await emailCheckResponse.json(); // Parse the boolean response
            if (emailExists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "Email already exists. Please use a different email."
                }));
                return;
            }

            // Proceed with registration
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
                console.error("Registration failed:", errorMessage);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    form: errorMessage
                }));
                return;
            }

            const data = await response.json();
            console.log("Success:", data);
            if (onRegister) {
                onRegister(data); // Invoke callback with response data
            }
            navigate('/'); // Redirect to home after successful registration
        } catch (error) {
            console.error("Unexpected error:", error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                form: "An unexpected error occurred. Please try again later."
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
                    onChange={handleUpdate}
                />
                {errors.name && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.name}</p>}
            </div>
            <div>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleUpdate}
                />
                {errors.email && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email}</p>}
            </div>
            <div>
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleUpdate}
                />
                {errors.password && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.password}</p>}
            </div>
            <div>
                <label>
                    Role:
                    <select name="role" onChange={handleUpdate} required>
                        <option value="">Select Role</option>
                        <option value="ROLE_AGENT">Agent</option>
                        <option value="ROLE_CUSTOMER">Customer</option>
                    </select>
                </label>
                {errors.role && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.role}</p>}
            </div>
            {errors.form && <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.form}</p>}
            <button type="submit" className="form-button">Register</button>
            <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
        </form>
    );
};

export default RegisterForm;