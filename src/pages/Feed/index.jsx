import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../Feed/index.css'
import NavBar from '../../components/Navbar'



const API_URL = 'https://chattr-server-2.onrender.com'


const Feed = () => {
    const [feeds, setFeed] = useState([])
    const [text, setText] = useState('')
    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken')

    const createTweet = async  () => {

        try {
            const requestTweet = {text}
            await axios.post(`${API_URL}/api/tweets`, requestTweet, {headers: {Authorization: `Bearer ${storedToken}`}})
            setText('')
            fetchData()
           } catch (error) {
            console.log(error)
        }
    }
    
    const fetchData = async () => {
       
       try {       
        const response = await axios.get(`${API_URL}/api/tweets`, {headers: {Authorization: `Bearer ${storedToken}`}})
        setFeed(response.data)
        } catch (error) {
            console.log(error)
        }
    }

   
     
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        createTweet();
    }
    


    


    useEffect(() => {
      fetchData()
    }, [])


    

  return (
    <div>
        <NavBar/>
        <div>
            <h1>Speak Your Mind</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Tweet
                <textarea type='text' name='text' value={text}  cols='30' rows='5' onChange={(e) =>setText(e.target.value)}></textarea>
            </label>
           <button type='submit'><strong>Tweet</strong></button>

         </form>
       </div>
      

        {feeds.map((feed) =>{
            return (
               <div key={feed._id} className='tweet-box'>
                <div className='body'>
                    <div className='top'>
                {feed.author && feed.author.profileImage ? (<img src={feed.author.profileImage} className='profile' alt="userImage" />)
                : (<p>No Image Found</p>)    
                }
                   
                      {feed.author && feed.author.name ? (
        <span className='name'>@{feed.author.name}</span>
    ) : (
        <h3>No Author</h3>
    )}
    </div>

                    <Link to={`/feed/${feed._id}`}><p className='message'>{feed.text}</p></Link>
                    <div className='actions'>
                    <p>Likes: <span>{feed.likes.length}</span></p>
                    <p>Comments: <span>{feed.comments.length}</span></p>
                    </div>
                </div>
                    
                </div> 
            )
        })}
    </div>
  )
}

export default Feed