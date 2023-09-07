import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/Navbar';
import Skeleton from '@mui/material/Skeleton';
import '../SearchUsers/index.css';

const API_URL = 'https://chattr-server-2.onrender.com';

const SearchUsers = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const storedToken = localStorage.getItem('authToken');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/search?name=${query}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setResults(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <div>
      <NavBar />
      <div className='search-results'>
        <h1>Search Results</h1>
        {loading ? ( // Show Skeleton when loading
          <div>
            <Skeleton variant="rectangular" width={200} height={100} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={100} />
          </div>
        ) : (
          results.length > 0 ? (
            <div>
              {results.map((user) => (
                <div className="user-card" key={user._id}>
                  <img src={user.profileImage} alt='profile pic' className="profile-image" />
                  <div className="user-info">
                    <Link to={`/user/${user._id}/feed`}><p><strong>@{user.name}</strong></p></Link>
                    <p>{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2>No user found. 😢</h2>
          )
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
