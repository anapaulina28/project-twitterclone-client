import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Feed/index.css';
import NavBar from '../../components/Navbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumIcon from '@mui/icons-material/Forum';
import Skeleton from '@mui/material/Skeleton';

const API_URL = 'https://chattr-server-2.onrender.com';

const Feed = () => {
  const [feeds, setFeed] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('authToken');

  const createTweet = async () => {
    try {
      const requestTweet = { text };
      await axios.post(`${API_URL}/api/tweets`, requestTweet, { headers: { Authorization: `Bearer ${storedToken}` } });
      setText('');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tweets`, { headers: { Authorization: `Bearer ${storedToken}` } });
      setFeed(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTweet();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className='heading'>
        <h1>What's Up?</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea
            type='text'
            name='text'
            value={text}
            cols='30'
            rows='5'
            className="textarea-input"
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
          ></textarea>
          <button type='submit' className="submit-button">
            <strong>Post</strong>
          </button>
        </form>
      </div>

      {loading ? (
        // Show loading skeleton when data is loading
        <div>
          <Skeleton variant="rectangular" width={300} height={100} style={{ marginBottom: '10px' }} />
          <Skeleton variant="rectangular" width={300} height={100} style={{ marginBottom: '10px' }} />
          <Skeleton variant="rectangular" width={300} height={100} style={{ marginBottom: '10px' }} />
        </div>
      ) : (
        feeds.map((feed) => {
          return (
            <div key={feed._id} className='tweet-box'>
              <div className='body'>
                <div className='top'>
                  {feed.author && feed.author.profileImage ? (
                    <img src={feed.author.profileImage} className='profile' alt="userImage" />
                  ) : (
                    <p>No Image Found</p>
                  )}
                  {feed.author && feed.author.name ? (
                    <span className='name'>@{feed.author.name}</span>
                  ) : (
                    <h3>No Author</h3>
                  )}
                </div>

                <Link to={`/feed/${feed._id}`}>
                  <p className='message'>{feed.text}</p>
                </Link>
                <div className='actions'>
                  <p>
                    <FavoriteBorderIcon /> <span>{feed.likes.length}</span>
                  </p>
                  <p>
                    <ForumIcon /> <span>{feed.comments.length}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Feed;
