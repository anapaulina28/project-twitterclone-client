import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../../components/Navbar';
const API_URL = 'http://localhost:5005'


const SearchUsers = () => {
  const [results, setResults] = useState([])
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const storedToken = localStorage.getItem('authToken');
   const fetchData = async (e) => {
    

    try {
      const response = await axios.get(`${API_URL}/api/search?name=${query}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setResults(response.data);
      console.log(response.data);

      // Update the URL with the search query
      
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Initialize the search input field with the query from the URL
  useEffect(() => {
    fetchData()
  }, [query]);


 

  return (
    <div>
      <NavBar/>
      <h2>Search Results</h2>
      <div>
      {results.length > 0 ? ( // Check if there are results
        <div>
          {results.map((user) => (
            <div key={user._id}>
              <Link to={`/user/${user._id}/feed`}><p><strong>@{user.name}</strong></p></Link>
              <p>{user.email}</p>
              <img src={user.profileImage} alt='profile pic' />
            </div>
          ))}
        </div>
      ) : ( // Display a message when there are no results
        <p>No results found. 😢</p>
      )}
      </div>
    </div>
  );
};

export default SearchUsers;
