import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/Navbar';
import Skeleton from '@mui/material/Skeleton';
import '../UserTweet/index.css';

const API_URL = 'https://chattr-server-2.onrender.com';

const UserTweet = () => {
  const [userTweet, setUserTweet] = useState([]);
  const { Id } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(true);

  const getUserTweet = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/${Id}/tweets`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUserTweet(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching user tweet details:', error);
    }
  };

  useEffect(() => {
    getUserTweet();
  }, [Id]);

  return (
    <div>
      <NavBar />
      <div className="tweet-list">
        <h3 className="username">
          {loading ? (
            <Skeleton variant="text" width={150} />
          ) : (
            `@${userTweet.name} Tweets`
          )}
        </h3>
        {loading ? (
          <Skeleton variant="text" width={200} height={20} />
        ) : userTweet.tweets && userTweet.tweets.length > 0 ? (
          userTweet.tweets.map((feed) => (
            <div className="tweet" key={feed._id}>
              <p className="tweet-label">
                <strong>Tweet</strong>
              </p>
              <Link to={`/feed/${feed._id}`} className="tweet-text">
                {feed.text}
              </Link>
            </div>
          ))
        ) : (
          <h1 className="no-tweets">No tweets found for this user.</h1>
        )}
      </div>
    </div>
  );
};

export default UserTweet;
