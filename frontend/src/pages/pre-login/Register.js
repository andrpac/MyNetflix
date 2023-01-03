import './pre-login.css'
import '../../App.css';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
            navigate(-1);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <div className='background'>
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='/'>
              <button className='navbar-button'>Back</button>
            </Link> 
          </div>
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