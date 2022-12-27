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
                <label>First Name: </label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input><br />
                <label>Last Name: </label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input><br />
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input><br />
                <label>Password: </label>
                <input type="password "value={password} onChange={(e) => setPassword(e.target.value)}></input><br />
                <input type="submit" className='submit' value="Register" />
            </form>
          </div>
        </div>
    )
}

export default Register;