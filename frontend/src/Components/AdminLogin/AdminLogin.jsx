import React,{useState} from 'react'
import './AdminLogin.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'



function AdminLogin() {
    const navigate = useNavigate()
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [error , setError]  =useState('')
    
    useEffect(()=>{
      const adminInfo = localStorage.getItem('AdminInfo');

      if(adminInfo){
        navigate('/adminhomepage')
      }else{
        navigate('/admin')
      }
    },[navigate])


    const submitHandler = async(e) => {
        e.preventDefault();

        try {
            const config = {
              headers:{
                "Content-type":"application/json"
              }
            }


            const data = await axios.post('/api/Admin/adminlogin',{
              email,
              password
            },config)

            console.log(data);
            localStorage.setItem('AdminInfo',JSON.stringify(data))
            navigate('/adminhomepage')
        } catch (error) {
            console.log(error);
            setError("invalid admin Login")
        }
    }

  return (
    <div className='FullBox'>
      <form className='box' onSubmit={submitHandler} >
      <h1>Admin Login</h1>

      {/* Error Handling */}
      
      <input type="email" placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
      <br/>
      <input type="password" placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>
      <br/>
      <input type="submit" value="Login"/>
    </form>
    </div>
  )
}

export default AdminLogin