import React, { useState } from 'react'

export default function SignUp() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [gender, setGender] = useState()
    const [dob, setDob] = useState()
    const [role, setRole] = useState()

async function handleSummit(e) {
    e.preventDefult();

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
    <>
    <form onSubmit={handleSummit}>

        <h3>SignUp</h3>
        <label>Username</label>
        <input type='text' required value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br /><br />

        <label>Email</label>
        <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br /><br />

        <label>Password</label>
        <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br /><br />

        <label>Gender:</label>
        Male<input type='radio' required value={gender} onChange={(e) => setGender(e.target.value)}/>
        Female<input type='radio' required value={gender} onChange={(e) => setGender(e.target.value)} />
        Other<input type='radio' required value={gender} onChange={(e) => setGender(e.target.value)}/>
        <br /><br />

        <label>Dob</label>
        <input type='date' required value={dob} onChange={(e) => setDob(e.target.value)} />
        <br /><br />

        <label>Role:</label>
        Admin<input type='radio' value={role} onChange={(e) => setRole(e.target.value)} />
        Customer<input type='radio' value={role} onChange={(e) => setRole(e.target.value)} />
        <br /><br />

        <button type='submit'>SignUp</button>
    </form>
    </>
)
}