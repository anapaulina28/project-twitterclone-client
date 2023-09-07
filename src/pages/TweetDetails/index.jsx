import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import NavBar from '../../components/Navbar';
import Skeleton from '@mui/material/Skeleton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "../TweetDetails/index.css" 


const API_URL = 'https://chattr-server-2.onrender.com';

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const { feedId } = useParams();
  const storedToken = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([])
  const [text, setText] = useState('')
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tweets/${feedId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setTweet(response.data);
      console.log("response data for tweet",response.data)
      if (response.data.author._id === user._id) {
        setIsUser(true);
      }
      setLikes(response.data.likes)
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
      fetchData()
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
      fetchData()
      setIsLiked(false);
      setLikes(response.data.likes)
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
            fetchData()
            setText('')
        
    } catch (error) {
        console.log(error)
    }
  }

  const deleteComment = async (commentId) => {
    try {
        await axios.delete(`${API_URL}/api/comment/delete/${commentId}/${feedId}`,{
            headers: { Authorization: `Bearer ${storedToken}` }});
        fetchData();
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
    <div >
    <NavBar/>
      {loading ? (
        <div className="tweet-details-skeleton">
        <Skeleton variant="rectangular" width={200} height={200} style={{ marginBottom: '10px' }} />
        <Skeleton variant="text" width={200} style={{ marginBottom: '10px' }} />
        <Skeleton variant="text" width={200} style={{ marginBottom: '10px' }} />
        <Skeleton variant="text" width={200} style={{ marginBottom: '10px' }} />
        <Skeleton variant="text" width={200} style={{ marginBottom: '10px' }} />
      </div>
      ) : error ? (
        <p>{error}</p>
      ) : tweet ? (
        <div className='tweet-details'>
          <div className='tweet-details-box'>
          {tweet.author && tweet.author.profileImage ? (
            <img src={tweet.author.profileImage} alt="userImage" />
          ) : (
            <p>No Image Found</p>
          )}
          {tweet.author && tweet.author.name ? (
            <h3 className='username'>@{tweet.author.name}</h3>
          ) : (
            <h3>No Author</h3>
          )}
          <p className='post'><strong>Post: </strong>{tweet.text}</p>
          {isLiked ||likes.filter(like => like._id === user._id).length > 0 ? (
            <button onClick={unlikeData}>
               <p>< FavoriteIcon/>   {likeCount}</p>
            </button>
          ) : (
            <button onClick={likeData}>
               <p>< FavoriteBorderIcon/>   {likeCount}</p>
            </button>
          )}
        <div className='details-buttons'>
        {isUser && <button><Link className="edit-button" to={`/feed/${feedId}/edit`}>Edit Post </Link> </button>}
       

        {isUser && <button className='delete-button' onClick={deleteTweet}>Delete Post</button>}
      </div>
        </div>
          <form onSubmit={handlesubmit}>
            <label></label>
            <textarea type="text" name='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Leave your comment here' cols='30' rows='5'></textarea>
            <br/>
            <button type='submit'>Comment</button>
          </form>
          {tweet.comments && tweet.comments.length > 0 ? (
            <div>
              
              <div>
                {tweet.comments.map((comment) => (
                  <div className="comment-box" key={comment._id} >
                    <p> <strong> @{comment.author && comment.author.name}</strong> </p>
                    <p><strong>Comment: </strong>{comment.text}</p>
                {comment.author._id === user._id &&
                    (<button onClick={()=>{deleteComment(comment._id)}}>Delete Comment</button>)
                }
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
