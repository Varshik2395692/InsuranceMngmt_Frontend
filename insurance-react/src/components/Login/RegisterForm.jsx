import { useState } from "react";
import InputField from "../InputField";

const RegisterForm = ({ onRegister }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "ROLE_CUSTOMER"
    });

    const [error, setError] = useState(null);

    function handleUpdate(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before submission

        // Validation for empty fields
        if (!user.name || !user.email || !user.password || !user.role) {
            setError("All fields are required. Please fill out all fields.");
            alert("Please fill out all fields before submitting.");
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
                
                // Handle duplicate email error
                if (errorMessage.toLowerCase().includes("email")) {
                    alert("This email is already registered. Please use a different email.");
                } 
                // Handle duplicate password error (if applicable)
                else if (errorMessage.toLowerCase().includes("password")) {
                    alert("This password is already in use. Please choose a different password.");
                } 
                else {
                    alert(errorMessage);
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log("Success:", data);
            if (onRegister) {
                onRegister(data); // Invoke callback with response data
            }
            alert("Registration successful!"); // Success popup
        } catch (error) {
            console.error("Error:", error);
            setError(error.message); // Display error message to the user
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
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
        </form>
    );
};

export default RegisterForm;