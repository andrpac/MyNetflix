import './pre-login.css'
import '../../App.css';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    // Used to get typed in first name
    const [firstName, setFirstName] = useState('');

    // Used to get typed in last name
    const [lastName, setLastName] = useState('');

    // Used to get typed in email
    const [email, setEmail] = useState('');
    
    // Used to get typed in password
    const [password, setPassword] = useState('');

    // Used to navigate back to home page if registration is complete
    const navigate = useNavigate();

    // Function to send in data to local database after submitting the form
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
            // Navigate back to home page is registration is complete
            navigate(-1);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <div className='background'>
          {/* Back button in the navbar */}
          <div className='background-fade' style={{'textAlign': 'left'}}>
            <Link to='/'>
              <button className='navbar-button'>Back</button>
            </Link> 
          </div>
          
          {/* Submission form with typed in personal information */}
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