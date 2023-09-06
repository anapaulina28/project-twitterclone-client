import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = 'https://chattr-server-2.onrender.com'

import React from 'react'
const AuthContext = createContext();

const AuthProviderWrapper = (props) => {
  const navigate = useNavigate()
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [user, setUser] = useState(null);


  const storeToken = (token) =>{
    localStorage.setItem('authToken', token)
  }

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken')
    if(storedToken) {
      axios.get(`${API_URL}/auth/verify`, {headers: {Authorization: `Bearer ${storedToken}`}})
   
    .then((response) =>{
      const user = response.data
      setIsLoggedIn(true);
      setIsLoading(false);
      setUser(user)
      navigate('/feed')
    })
  
    .catch (() =>{
      setIsLoggedIn(false)
      setIsLoading(false)
      setUser(null)
    })
  }
    else {
       setIsLoggedIn(false)
       setIsLoading(false)
       setUser(null)
    }
  
  }
  const removeToken = () => {
    localStorage.removeItem('authToken')
  }

  const logOutUser = () =>{
    removeToken()
    authenticateUser()
    navigate("/")
  }

  useEffect(() =>{
    authenticateUser();
  }, [])

  return (
    <AuthContext.Provider  value={{isLoggedIn, isLoading, user, storeToken, authenticateUser, removeToken, logOutUser}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export  {AuthProviderWrapper, AuthContext};