import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Home = () => {
    const {isLoggedIn, user, logOutUser} = 
    useContext(AuthContext);
    return (
      <nav>
      <div>
      <Link to="/">
          <button>Home</button>
      </Link>
      </div>
      {isLoggedIn? (
        <div>
          <button onClick={logOutUser}>Logout</button>
          <p>{user && user.name}</p>
        </div>
      ): 
      (
        <div>
          <Link to="/signup"><button>Signup</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      )
    } 
      </nav>
    )
}

export default Home