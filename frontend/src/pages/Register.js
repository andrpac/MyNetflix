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

    return (<div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>First Name: </label>
          <textarea value={firstName} onChange={(e) => setFirstName(e.target.value)}></textarea>
          <label>Last Name: </label>
          <textarea value={lastName} onChange={(e) => setLastName(e.target.value)}></textarea>
          <label>Email: </label>
          <textarea value={email} onChange={(e) => setEmail(e.target.value)}></textarea>
          <label>Password: </label>
          <textarea value={password} onChange={(e) => setPassword(e.target.value)}></textarea>
          <button>{'Submit'}</button>
        </form>
        </div>
    )
}

export default Register;