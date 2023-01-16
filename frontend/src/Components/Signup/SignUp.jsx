import React, { useState } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Errormessage from '../Errormessage'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import Validation from '../../Validation';


function SignUp() {

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [password , setPassword] = useState("");
    const [Confirmpassword , setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const [error,setError] = useState(false)
    const [errors,setErrors] = useState({})
    const navigate = useNavigate();


    useEffect(()=>{
      const userInfo = localStorage.getItem('userInfo');

      if(userInfo){
        navigate('/')
      }
    },[navigate])


    const registerUser= async(e) =>{
        e.preventDefault()
      if(password !== Confirmpassword){
        setMessage("Password Not Matching");
      }else{
        setMessage(null)
        try {
            const config = {
              headers: {
                  "Content-type": "application/json"
              },
          }
          

          const {data}  = await axios.post("/api/users/signup",{
            name , email , phone , password
          },config);

          localStorage.setItem("userInfo",JSON.stringify(data));
          navigate('/')
          console.log(data);
        } catch (error) {
          setErrors(Validation(name,email,phone,password))
        }
      }
      }


  return (
    <>
    <div className='signup_container'>
    <div className='signup_form_container'>
      <div className='right'>
        <h1>Welcome Back</h1>
        <Link to="/">
          <button type="button" className='white_btn'>
            Sign In
          </button>
        </Link>
      </div>
      <div className='left'>
        <form className='form_container' onSubmit={registerUser}>
          <h1 style={{color:'#333'}}>Create Account</h1>
          {error && <Errormessage>{error}</Errormessage>}
          {message && <Errormessage >{message}</Errormessage> }
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e)=>setName(e.target.value)} value={name}
            className='input'
          />
           {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e)=>setEmail(e.target.value)} value={email}
            className='input'
          />
           {errors.email && <p className="error">{errors.email}</p>}
          <input type="number" name="phone"  onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="Phone" className='input'/>
          {errors.phone && <p className="error">{errors.phone}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)} value={password}
            className='input'
          />
           {errors.password && <p className="error">{errors.password}</p>}
          <input type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} value={Confirmpassword} placeholder="Confirm Password" name="Confirmpassword" className='input'/>
          <button type="submit" className='green_btn'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

export default SignUp