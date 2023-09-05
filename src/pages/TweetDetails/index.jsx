import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const API_URL = 'http://localhost:5005';

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const { feedId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const [isLiked, setIsLiked] = useState(false);
  const [text, setText] = useState('')
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tweets/${feedId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setTweet(response.data);
      if (response.data.author._id === user._id) {
        setIsUser(true);
      }
      setLikeCount(response.data.likes ? response.data.likes.length : 0); // Initialize like count
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tweet details:', error);
      setError('An error occurred while fetching tweet details.');
      setLoading(false);
    }
  };

  const likeData = async () => {
    try {
      await axios.post(`${API_URL}/api/tweets/${feedId}/likes`, " ", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setIsLiked(true);
      setLikeCount(likeCount + 1); // Increment like count
    } catch (error) {
      console.log('Error liking tweet:', error);
    }
  };

  const unlikeData = async () => {
    try {
      await axios.post(`${API_URL}/api/tweets/${feedId}/unlike`, " ", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setIsLiked(false);
      setLikeCount(likeCount - 1); // Decrement like count
    } catch (error) {
      console.log('Error unliking tweet:', error);
    }
  };

  const deleteTweet = async () => {
    try {
      await axios.delete(`${API_URL}/api/tweets/${feedId}/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      navigate('/feed');
    } catch (error) {
      console.log('Error deleting tweet:', error);
    }
  };

  const createComment = async () => {
    try {
        const requestComment = {text}
        await axios.post(`${API_URL}/api/comment/create/${feedId}`, requestComment, {
            headers: { Authorization: `Bearer ${storedToken}` }} )
            navigate(`/feed/${feedId}`)
            setText('')
        
    } catch (error) {
        console.log(error)
    }
  }

  const deleteComment = async () => {
    try {
        await axios.delete(`${API_URL}/comments/delete/`)
    } catch (error) {
        
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    createComment();
  }


  useEffect(() => {
    fetchData();
  }, [feedId]);

  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tweet ? (
        <div>
          {tweet.author && tweet.author.profileImage ? (
            <img src={tweet.author.profileImage} alt="userImage" />
          ) : (
            <p>No Image Found</p>
          )}
          {tweet.author && tweet.author.name ? (
            <h3>{tweet.author.name}</h3>
          ) : (
            <h3>No Author</h3>
          )}
          <p>Tweet: {tweet.text}</p>
          {isLiked ? (
            <button onClick={unlikeData}>
              Unlike <p>Likes: {likeCount}</p>
            </button>
          ) : (
            <button onClick={likeData}>
              Like <p>Likes: {likeCount}</p>
            </button>
          )}
        <div>
        {isUser && <Link to={`/feed/${feedId}/edit`}>Edit Tweet</Link>}
        <br />

        {isUser && <button onClick={deleteTweet}>Delete Tweet</button>}
      </div>
          <form onSubmit={handlesubmit}>
            <label></label>
            <textarea type="text" name='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Leave your comment here' cols='30' rows='5'></textarea>
            <br/>
            <button type='submit'>Comment</button>
          </form>
          {tweet.comments && tweet.comments.length > 0 ? (
            <div>
              <p>Comments:</p>
              <div>
                {tweet.comments.map((comment) => (
                  <div key={comment._id}>
                    <p> <strong> {comment.author && comment.author.name}</strong> </p>
                    <p>{comment.text}</p>
                </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No comments</p>
          )}
        </div>
      ) : (
        <p>No tweet found.</p>
      )}
        <br/>
     
    </div>
  );
};

export default TweetDetails;
