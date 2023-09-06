import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import '../Home/index.css'


const Home = () => {
    const {isLoggedIn, user, logOutUser} = 
    useContext(AuthContext);
    return (
      <nav>
 
      {isLoggedIn? (
        <div>
          <button onClick={logOutUser}>Logout</button>
          <p>{user && user.name}</p>
        </div>
      ): 
      (
        <div className='home-buttons'> 

          <div className="logo">
          <img src='../../src/assets/images/logo.png' alt='chattr logo'/>
          </div>

          <Link to="/signup"><button>Signup</button></Link>
          <Link to="/login"><button>Login</button></Link>

          <div className="people">
          <img src='../../src/assets/images/people.png' alt='people'/>
          </div>

        </div>
      )
    } 

      </nav>
    )
}

export default Home