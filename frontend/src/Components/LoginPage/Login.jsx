import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Errormessage from '../Errormessage'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState('')
  const navigate = useNavigate();
 


  // callling useEffect and navigate to homepage and checking there is user logged in or not.
  useEffect(()=>{
     const userInfo = localStorage.getItem('userInfo');

     if(userInfo){
       navigate('/homepage')
     }
  },[navigate])


  // sending data to backend calling the function submitHandler

  const submitHandler = async(e) => {
    e.preventDefault();

    console.log(email,password);

    try {
      const config = {
        headers: {
            "Content-type": "application/json"
        },
    }


      //sending file using axios
      const data = await axios.post('/api/users/login',{
       email,
      password
      },config)


      console.log(data);
      // Storing data to localstorage.
      localStorage.setItem('userInfo',JSON.stringify(data))
        navigate('/homepage')
    } catch (error) {
      console.log(error);
      setError("Invalid Email Or Password")
    } 


    console.log(error);
  }


  return (
    <div className='FullBox' >
        <form className='box' onSubmit={submitHandler} >
      <h1>User Login</h1>

      {/* Error Handling */}
      {error && <Errormessage variant="danger" >{error}</Errormessage>}
      <input type="email" placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
      <br/>
      <input type="submit" value="Login"/>
    <Link to='/signup' ><h1 className='redirectSignup' >New user?Create a new account?</h1></Link>
    </form>
    </div>
  )
}

export default Login