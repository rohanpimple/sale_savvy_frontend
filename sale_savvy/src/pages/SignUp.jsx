import React, { useState } from 'react'

export default function SignUp() {

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [dob, setDob] = useState()
    const [role, setRole] = useState()

};

function handleSummit(e) {
    e.preventDefult();
    const signupdata = {username, email, password, dob, role}

}



  return (
    <>
    <form onSubmit={handleSummit}>
        <h3>SignUp</h3>
        <label>Username</label>
        <input type='text' required name='username' onChange={(e) => setUsername()}/>
        <br /><br />

        <label>Email</label>
        <input type='email' required name='email'/>
        <br /><br />

        <label>Password</label>
        <input type='password' required name='password'/>
        <br /><br />

        <label>Gender:</label>
        Male<input type='radio' required name='gender'/>
        Female<input type='radio' required name='gender'/>
        Other<input type='radio' required name='gender'/>
        <br /><br />

        <label>Dob</label>
        <input type='date' required name='dob' />
        <br /><br />

        <label>Role:</label>
        Admin<input type='radio' name='role' />
        Customer<input type='radio' name='role' />
        <br /><br />

        <button type='submit'>SignUp</button>
    </form>
    </>
)

