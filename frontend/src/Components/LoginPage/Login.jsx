import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Errormessage from '../Errormessage'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Validation from '../../Validation';


function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState('')
  const [errors,setErrors] = useState({})
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
      setErrors(Validation(email,password))
    } 


    console.log(error);
  }


  return (


<div className='login_container'>
<div className='login_form_container'>
  <div className='left'>
    <form className='form_container' onSubmit={submitHandler}>
      <h1 style={{color:'#333'}}>Login to Your Account</h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}  onChange={(e)=>setEmail(e.target.value)}
        className='input'
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}  onChange={(e)=>setPassword(e.target.value)}
        className='input'
      />
      {errors.password && <p className="error">{errors.password}</p>}
      {/* {error && <Errormessage variant="danger" className='error_msg' >{error}</Errormessage>} */}
      <button type="submit" className='green_btn'>
        Sign In
      </button>
    </form>
  </div>
  <div className='right'>
    <h1>New Here ?</h1>
    <Link to="/signup">
      <button type="button" className='white_btn'>
        Sign Up
      </button>
    </Link>
  </div>
</div>
</div>
  )
}

export default Login