import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import '../Home/index.css'


const Home = () => {
    const {isLoggedIn, user, logOutUser} = 
    useContext(AuthContext);
    return (
      <nav className='nav'>
 
      {isLoggedIn? (
        <div>
          <button onClick={logOutUser}>Logout</button>
          <p>{user && user.name}</p>
        </div>
      ): 
      (
        <div className='home-buttons'> 

          <div className="logo">
          <img src='/images/logo.png' alt='chattr logo'/>
          </div>
          
          <div className='div-buttons'>
          <Link to="/signup"><button>Signup</button></Link>
          <Link to="/login"><button>Login</button></Link>
          </div>
          <div className="people">
          <img src='/images/people.png' alt='people'/>
          </div>

        </div>
      )
    } 

      </nav>
    )
}

export default Home


