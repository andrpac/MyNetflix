import './App.css';
import Home from './pages/pre-login/Home';
import Login from './pages/pre-login/Login';
import Register from './pages/pre-login/Register';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
