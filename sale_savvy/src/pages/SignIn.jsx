import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SignIn.css'; // ✅ Add this line

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSumbit(e) {
    e.preventDefault();
    const signInData = { username, password };

    try {
      const resp = await fetch("http://localhost:8080/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });

      const msg = await resp.text();
      console.log("Server Response:", msg);

      if (msg === "admin") {
        localStorage.setItem("username", username);
        navigate('/Admin_page');
      } else if (msg === "customer") {
        localStorage.setItem("username", username);
        navigate('/Customer');
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSumbit}>
        <h2>Sign In</h2>

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

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
