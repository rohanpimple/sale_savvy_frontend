import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/SignUp.css';

export default function SignUp() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")
    const [role, setRole] = useState("")

    const navigate = useNavigate();

async function handleSummit(e) {
    e.preventDefault();
    navigate('/signIn')
    const signupdata = {username, email, password, gender, dob, role};

try {
    const resp = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupdata),
    });

    alert(await resp.text());
    } catch (err) {
    console.error(err);
    alert("Failed to sign up");
    }
}

return (
  <div className="signup-page">
    <form className="signup-form" onSubmit={handleSummit}>
      <h2>Create Your Account</h2>

      <label>Username</label>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Gender:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />{" "}
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={gender === "Other"}
            onChange={(e) => setGender(e.target.value)}
          />{" "}
          Other
        </label>
      </div>

      <label>Date of Birth</label>
      <input
        type="date"
        required
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <label>Role:</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="role"
            value="Admin"
            checked={role === "Admin"}
            onChange={(e) => setRole(e.target.value)}
          />{" "}
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="Customer"
            checked={role === "Customer"}
            onChange={(e) => setRole(e.target.value)}
          />{" "}
          Customer
        </label>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
);

}