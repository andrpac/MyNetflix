import '../../App.css';

import { Link } from "react-router-dom";

function Home() {
    return (
        <div className='background'>
          <div className='background-fade'>
            { /* Sign In Button */ }
            <Link to='/login'>
              <button className='navbar-button'>Sign In</button>
            </Link>

            { /* Register button */}
            <Link to='/register'> 
              <button className='navbar-button'>Register</button>
            </Link>
          </div>
        </div>
    )
}

export default Home;