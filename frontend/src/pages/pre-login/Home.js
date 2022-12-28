import { Link } from "react-router-dom";

function Home() {
    return (
        <div className='login-component'>
          <div className='navbar-component'>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <Link to='/register'> 
              <button>Register</button>
            </Link>
          </div>
        </div>
    )
}

export default Home;