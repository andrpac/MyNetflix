import './App.css';
import Home from './pages/pre-login/Home';
import Login from './pages/pre-login/Login';
import Register from './pages/pre-login/Register';
import Series from './pages/post-login/Series';
import AddSeries from './pages/post-login/AddSeries';

import { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  const [loginEnable, setLoginEnable] = useState(false);
  const [user, setUser] = useState(null);

  function enableLogin(data) {
      setLoginEnable(true);
      setUser(data); 
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/login' element={<Login activateLogin = {(data) => enableLogin(data)} />} />
        <Route exact path='/register' element={<Register />} />
        {loginEnable && <Route exact path='/series' element={<Series user={user} />} />}
        <Route path='*'element={<div className='background'></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
