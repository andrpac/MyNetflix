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
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>Email: </label>
            <textarea value={email} onChange={(e) => setEmail(e.target.value)}></textarea>
            <label>Password: </label>
            <textarea value={password} onChange={(e) => setPassword(e.target.value)}></textarea>
            <button>{'Submit'}</button>
          </form>
        </div>
    )
}


export default Login;