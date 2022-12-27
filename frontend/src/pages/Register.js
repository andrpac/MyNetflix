import './Login.css'
import { useState } from 'react'

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        const profile = {
            firstName: firstName,
            lastName: lastName, 
            email: email,
            password: password,
            series: []
        }

        fetch('http://localhost:8080', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <div className='login-component'>
          <div className='login-border'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label> Create Account</label>
                <input type="text" required value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input><br />
                <input type="text"  required value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input><br />
                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input><br />
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input><br />
                <input type="submit" className='submit' value="Register" />
            </form>
          </div>
        </div>
    )
}

export default Register;