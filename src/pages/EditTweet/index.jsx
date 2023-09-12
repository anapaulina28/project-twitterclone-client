import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../components/Navbar'
import '../EditTweet/index.css'
const API_URL ='https://chattr-server-2.onrender.com'



const EditTweet = () => {
    const [text, setText] = useState('')
    const {feedId} = useParams()
    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken')

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/tweets/${feedId}`, {headers: {Authorization: `Bearer ${storedToken}`}})
            setText(response.data.text)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      fetchData()
    }, [feedId])

    const collectData = async () => {
        try {
            const requestBody = {text}
            await axios.put(`${API_URL}/api/tweets/${feedId}/edit`, requestBody, {headers: {Authorization: `Bearer ${storedToken}`}})
            navigate(`/feed/${feedId}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        collectData();
    }
    
  return (
    <div>
    <NavBar/>
        <h3>Edit Tweet</h3>
        <form onSubmit={handleSubmit}>
            <label>
                Tweet
                <textarea type='text' name='text' value={text} onChange={(e)=> setText(e.target.value)}></textarea>
            </label>
            <button type='submit'>Edit Tweet</button>
        </form>
       

    </div>
  )
}

export default EditTweet