import './App.css';

import Home from './pages/pre-login/Home';
import Login from './pages/pre-login/Login';
import Register from './pages/pre-login/Register';
import Series from './pages/post-login/Series';

import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  // Used to decide if user is logged in or not 
  const [loginEnable, setLoginEnable] = useState(false);

  // Used to get the user data after login
  const [user, setUser] = useState(null);

  // Function to change state from logged out state to logged in state
  function enableLogin(data) {
      setLoginEnable(true);
      setUser(data); 
  }

  /* Path structure:
    Home: /
      -> Login: /login
      -> Register: /register
      -> Series: /series
      -> Invalid page: /*
  */

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/> 
        <Route exact path='/login' element={<Login activateLogin = {(data) => enableLogin(data)} />} />
        <Route path='/register' element={<Register />} />
        {loginEnable && <Route exact path='/series/*' element={<Series user={user} />} />}
        <Route path='*'element={<div className='background'></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
