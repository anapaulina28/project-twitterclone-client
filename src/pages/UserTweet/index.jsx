import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const API_URL = 'http://localhost:5005'


const UserTweet = () => {
  const [userTweet, setUserTweet] = useState([])
  const {Id} = useParams()

  const storedToken = localStorage.getItem('authToken')
  
  const getUserTweet = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/${Id}/tweets`,  {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      setUserTweet(response.data);
      console.log(response.data)
    } catch (error) {
       console.log('Error fetching user tweet details:', error);
    }
  }

  useEffect(() => {
    getUserTweet();
  }, [Id])
  


  return (
    <div>
      <h3>@{userTweet.name} Tweets</h3>
      {userTweet.tweets && userTweet.tweets.length > 0 ? (
        userTweet.tweets.map((feed) => (
          <div key={feed._id}>
            <p><strong>Tweet</strong></p>
            <Link to={`/feed/${feed._id}`}><p>{feed.text}</p></Link>
          </div>
        ))
      ) : (
        <p>No tweets found for this user.</p>
      )}
    </div>
  );
}

export default UserTweet