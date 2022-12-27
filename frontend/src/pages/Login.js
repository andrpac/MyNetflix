import './Login.css';
import { useState } from 'react'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [attemptLogin, setAttempLogin] = useState('');

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
            console.log('Success', data);
        })
        .catch((error) => {
            setAttempLogin(error.message);
            console.error(error);
        })

    }

    return (
        <div className='login-component'>
          <div className='login-border'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Sign In </label>
                <input type='text' required value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input><br/>
                <input type='password' required value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br/>
                <input type='submit' className='submit' value={'Login'}></input>
                {attemptLogin ? <p className='error'>{attemptLogin}</p> : <p className='error' style={{'color':'black'}}>Hey</p>}
            </form>
          </div>
        </div>
    )
}


export default Login;