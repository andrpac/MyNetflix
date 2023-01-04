import './pre-login.css';
import '../../App.css';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props){
    // Used to get typed in email
    const [email, setEmail] = useState('');

    // Used to get typed in password
    const [password, setPassword] = useState('');

    // Used to get error message if login is unsuccessful
    const [attemptLogin, setAttempLogin] = useState('');

    // Used to navigate if login is successful to series page
    const navigate = useNavigate();

    // Function to send in data to local database after submitting the form
    function handleSubmit(e) {
        e.preventDefault();
        
        fetch('http://localhost:8080/query/' + email, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {        
            return response.json();
        })
        .then((data) => {
            if(data.Error === null || password !== data.password){
                throw Error("Invalid credentails!")
            }
            // Transmit to the App component that login is successful 
            props.activateLogin(data);

            // Navigate to series page
            navigate('../series');
            
        })
        .catch((error) => {
            // Update and get the error message to the screen
            setAttempLogin(error.message);
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

          {/* Submission form with typed in credentials */}
          <div className='login-border'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>Sign In </label>
              <input type='text' required value={email} placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)}></input><br/>
              <input type='password' required value={password} placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)}></input><br/>
              <input type='submit' className='submit' value={'Login'}></input>
              {attemptLogin ? <p className='error'>{attemptLogin}</p> : <p className='error' style={{'color':'black'}}>a</p>}
            </form>
          </div>
        </div>
    )
}


export default Login;