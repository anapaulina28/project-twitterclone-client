// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function SignupPage(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const [errorMessage, setErrorMessage] = useState(undefined);

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
  

//   // Create our request body object
//   const requestBody = { name, email, password };

//   // We send these info to backend
//   axios
//     .post(`${API_URL}/auth/signup`, requestBody)
//     .then(() => {
//       navigate("/login");
//     })
//     .catch((error) => {
//       const errorDescription = error.response.data.message;
//       setErrorMessage(errorDescription);
//     });

// };
//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//         </label>

//         <label>
//           Password:{" "}
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//         </label>

//         <label>
//           Name:{" "}
//           <input
//             type="name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></input>
//         </label>
//         <button type="submit">Sign Up</button>
//         {errorMessage && <p>{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default SignupPage;

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const API_URL ='https://chattr-server-2.onrender.com'


const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined)


    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const requestBody = {name, email, password};
            await axios.post(`${API_URL}/auth/signup`, requestBody)
            navigate('/login')
            
        } catch (error) {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription);

        }
      
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchData();
    }

  return (
    <div className='signup-page'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>

            <div className='signup-buttons'>
            <label>Email: <input type='email' name='email' value={email} onChange={(e) =>setEmail(e.target.value)}/></label>
            <label>Password: <input type='password' name='password' value={password} onChange={(e) =>setPassword(e.target.value)}/></label>
            <label>Name: <input type='text' name='name' value={name} onChange={(e) =>setName(e.target.value)}/></label>
            <button type='submit'>Sign Up</button>
            {errorMessage && <p>{errorMessage}</p>}
            </div>
        </form>
    </div>
  )
}

export default SignUp