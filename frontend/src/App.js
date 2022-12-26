import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  /*
  const data = {
    firstName: "Jon",
    lastName: "Snow", 
    email: "jonsnow@gmail.com",
    password: "jonsnow",
    series: [{
        seriesName: "Breaking Bad",
        episodes: 80
    }]
  }

  fetch('http://localhost:8080', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  */

  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
