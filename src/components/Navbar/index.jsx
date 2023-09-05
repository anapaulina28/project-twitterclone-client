import { useContext, useState } from 'react';
import { Link, useNavigate,  } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const API_URL = 'http://localhost:5005'



const NavBar = () => {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate()

  const fetchData = async () =>{
    e.preventDefault()
    try {
      const response = await axios.get(`${API_URL}/api/search?name=${search}`,  {headers: {Authorization: `Bearer ${storedToken}`}})
      setResult(response.data)
      console.log(response.data)
      

    } catch (error) {
      console.log('Error:', error)
    }
  }


  return (
    <div>

      <img src='' alt='Social Media'/>
      {isLoggedIn && <div>
        <button onClick={logOutUser}>Logout</button>
        <p>{user && user.name}</p>
      </div>}

      <div>
        <form >
        <input type="text" placeholder='Search For Users' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={fetchData}>Search</button>
        </form>

         <ul>
        {result.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul> 
        
      </div>
    </div>
  )
}

export default NavBar