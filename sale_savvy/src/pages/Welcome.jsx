// Welcome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/welcome.css';
import welcomeImage from '/welcome2.jpeg'; // Update with your image path

export default function Welcome() {
    const [email, setEmail] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!showSignUp) {
            setShowSignUp(true);
            return;
        }

        const signupdata = { username, email, password, gender, dob, role };

        try {
            const resp = await fetch("http://localhost:8080/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupdata),
            });

            alert(await resp.text());
            navigate('/signIn');
        } catch (err) {
            console.error(err);
            alert("Failed to sign up");
        }
    }

    return (
        <div className="welcome-container">
            <div className="welcome-hero">
                <div className="welcome-content">
                    <h1>Join Thousands of Businesses that Trust</h1>
                    <h2>Our Platform to Supercharge their Business</h2>
                    
                    <div className="features">
                        <p><strong>100+ Payment Methods</strong></p>
                        <p><strong>Easy Integration</strong></p>
                        <p><strong>Powerful Dashboard</strong></p>
                    </div>
                </div>
                
                <div className="welcome-image">
                    <img src={welcomeImage} alt="Business illustration" />
                </div>
            </div>

            <div className="welcome-form-container">
                <div className="welcome-form">
                    <h2>Welcome to Our Platform</h2>
                    <p>Get started with your email or phone number</p>
                    
                    <form onSubmit={handleSubmit}>
                        {!showSignUp ? (
                            <>
                                <input 
                                    type="text" 
                                    placeholder="Enter your email or phone number" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="submit">Continue</button>
                                
                                <div className="saved-account" onClick={() => {
                                    setEmail("pingherchah58@gmail.com");
                                    setUsername("Rohan");
                                }}>
                                    Continue as Rohan<br />
                                    pingherchah58@gmail.com
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Complete Your Sign Up</h3>
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <label>Password</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <div className="form-group">
                                    <label>Gender:</label>
                                    <div className="radio-group">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Male" 
                                                checked={gender === "Male"} 
                                                onChange={(e) => setGender(e.target.value)} 
                                            /> Male
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Female" 
                                                checked={gender === "Female"} 
                                                onChange={(e) => setGender(e.target.value)} 
                                            /> Female
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Other" 
                                                checked={gender === "Other"} 
                                                onChange={(e) => setGender(e.target.value)} 
                                            /> Other
                                        </label>
                                    </div>
                                </div>

                                <label>Date of Birth</label>
                                <input 
                                    type="date" 
                                    required 
                                    value={dob} 
                                    onChange={(e) => setDob(e.target.value)} 
                                />

                                <div className="form-group">
                                    <label>Role:</label>
                                    <div className="radio-group">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="role" 
                                                value="Admin" 
                                                checked={role === "Admin"} 
                                                onChange={(e) => setRole(e.target.value)} 
                                            /> Admin
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="role" 
                                                value="Customer" 
                                                checked={role === "Customer"} 
                                                onChange={(e) => setRole(e.target.value)} 
                                            /> Customer
                                        </label>
                                    </div>
                                </div>

                                <button type="submit">Sign Up</button>
                            </>
                        )}
                    </form>
                    
                    <p className="terms">
                        By continuing you agree to our privacy policy and terms of use
                    </p>
                </div>
            </div>
        </div>
    );
}