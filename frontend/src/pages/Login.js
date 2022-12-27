import './Login.css';
import { useState } from 'react'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })

    }

    return (
        <div className="login-component">
          <div className="login-border">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Sign In </label>
                <input type="text" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input><br/>
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input><br/>
                <input type="submit" className='submit' value={"Login"}></input>
            </form>
          </div>
        </div>
    )
}


export default Login;