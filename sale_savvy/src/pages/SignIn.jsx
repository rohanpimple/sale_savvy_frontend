import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            localStorage.setItem("username", username);  // ✅ Save username
            navigate('/Admin_page');
        } else if (msg === "customer") {
            localStorage.setItem("username", username);  // ✅ Save username
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
        <div>
            <form onSubmit={handleSumbit}>
                <h3>SignIn</h3>

                <label>Username</label>
                <input
                    type='text'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />

                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />

                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}
