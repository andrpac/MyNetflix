import './pre-login.css';
import '../../App.css';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [attemptLogin, setAttempLogin] = useState('');
    const navigate = useNavigate();

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

            setAttempLogin('');          
            props.activateLogin(data);
            navigate('../series');
            
        })
        .catch((error) => {
            setAttempLogin(error.message);
            console.error(error);
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