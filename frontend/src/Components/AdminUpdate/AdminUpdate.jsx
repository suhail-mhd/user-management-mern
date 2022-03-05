import React, { useState } from 'react'
import './adminUpdate.css'
import axios from 'axios';
import Errormessage from '../Errormessage'
import {useNavigate , useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

function AdminUpdate(id) {

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [message,setMessage] = useState(null)
    const [error,setError] = useState(false)
    const navigate = useNavigate();
    const id1 = useParams();

    useEffect(()=>{
        const AdminInfo = localStorage.getItem('AdminInfo')
        if(AdminInfo){
          navigate(`/adminupdate/${id1.id}`)
        }else{
          navigate('/admin')
        }
        const getuser = async() => {
            const {data}  = await axios.get(`/api/users/getUser/${id1.id}`)
            console.log(data);
            setEmail(data.email)
            setName(data.name)
            setPhone(data.phone)
        }
        getuser()
    },[navigate])


    const registerUser  = async(e) =>{
        e.preventDefault();

        try {
          const config ={
            headers: {
                "Content-type":"application/json",
            },
        }
        
        axios.patch(`/api/users/update/${id1.id}`,{
          name,
          email,
          phone
        },config)
        navigate('/adminhomepage')
        } catch (error) {
            setError(error)
        }
    }

    const backtohomepage = () => {
      navigate('/admin')
    }

    

  return (
    <div className='signupBox'>
     <form className='box'  onSubmit={registerUser}>
      <h1>Update User</h1>
      {error && <Errormessage>{error}</Errormessage>}
      {message && <Errormessage >{message}</Errormessage> }
      <input type="text" onChange={(e)=>setName(e.target.value)} value={name}  placeholder="name"/>
      <br/>
      <input type="email"  onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
      <br/>
      <input type="number"  onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="Phone"/>
      <br/>
      <input type="submit" value="Update"/>   
      <br/>
      <Button variant="contained" color="success" onClick={backtohomepage} startIcon={<HomeSharpIcon/>}>
        Back To Homepage
      </Button>
    </form>
    
    
    
    </div>
  )
}

export default AdminUpdate