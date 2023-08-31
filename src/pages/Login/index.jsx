import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
const API_URL ='http://localhost:5005'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)

    const {storeToken, authenticateUser} = useContext(AuthContext)

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const requestBody = {email, password}
            const response = await axios.post(`${API_URL}/auth/login`, requestBody)
            storeToken(response.data.authToken)
            authenticateUser();
            navigate('/')
        } catch (error) {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        }
       
  
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetchData();
    }



  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>Email: <input type='email' name='email' value={email} onChange={(e)=> setEmail(e.target.value)}/></label>
            <label>Password: <input type='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/></label>
            <button type='submit'>Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p>Don't have an account yet?</p>
        <Link to='/signup'>Sign Up</Link>
        
    </div>
  )
}

export default Login