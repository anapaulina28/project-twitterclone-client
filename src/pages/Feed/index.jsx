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
                    {feed.author && feed.author.profileImage ? (<img src={feed.author.profileImage} alt="userImage" />)
                : (<p>No Image Found</p>)    
                }
                   
                      {feed.author && feed.author.name ? (
        <h3>@{feed.author.name}</h3>
    ) : (
        <h3>No Author</h3>
    )}
                    <Link to={`/feed/${feed._id}`}><p>{feed.text}</p></Link>
                    <p>Likes: <span>{feed.likes.length}</span></p>
                    <p>Comments: <span>{feed.comments.length}</span></p>
                </div> 
            )
        })}
    </div>
  )
}

export default Feed