import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:5005'


const Feed = () => {
    const [feeds, setFeed] = useState([])
    
    const fetchData = async () => {
        const storedToken = localStorage.getItem('authToken')
       try {       
        const response = await axios.get(`${API_URL}/api/tweets`, {headers: {Authorization: `Bearer ${storedToken}`}})
        setFeed(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      fetchData()
    }, [])
    

  return (
    <div>
        {feeds.map((feed) =>{
            return (
                <div key={feed._id}>
                      {feed.author && feed.author.name ? (
        <h3>{feed.author.name}</h3>
    ) : (
        <h3>No Author</h3>
    )}
                    <p>{feed.text}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Feed