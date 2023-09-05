import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

const API_URL = 'http://localhost:5005';

const NavBar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const fetchData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${API_URL}/api/search?name=${search}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setResult(response.data);
      console.log(response.data);

      // Update the URL with the search query
      navigate(`/search?query=${search}`);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Initialize the search input field with the query from the URL
  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [query]);

  return (
    <div>
      <Link to='/feed'><img src='' alt='Social Media' /></Link>
      {isLoggedIn && (
        <div>
          <button onClick={logOutUser}>Logout</button>
          <br />
          <div>
            {user && user.profileImage ? (
              <img src={user.profileImage} alt="userImage" />
            ) : (
              <></>
            )}
            <p>
              <strong>@{user && user.name}</strong>
            </p>
          </div>
        </div>
      )}

      <div>
        <form onSubmit={fetchData}>
          <input
            type="text"
            placeholder='Search For Users'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
