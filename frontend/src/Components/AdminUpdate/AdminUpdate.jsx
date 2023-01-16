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
    <div className='signup_container'>
    <div className='signup_form_container'>
      <div className='right'>
        <h1>Update One!</h1>
      </div>
      <div className='left'>
        <form className='form_container' onSubmit={registerUser}>
          <h1 style={{color:'#333'}}>Update User</h1>
          {error && <Errormessage>{error}</Errormessage>}
          {message && <Errormessage >{message}</Errormessage> }
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e)=>setName(e.target.value)} value={name}
            required
            className='input'
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e)=>setEmail(e.target.value)} value={email}
            required
            className='input'
          />
          <input type="number" name="phone"  onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="Phone" className='input'/>
          <button type="submit" className='green_btn'>
            Update
          </button>
          <Button variant="contained" color="info" onClick={backtohomepage} startIcon={<HomeSharpIcon/>} >Back to Homepage</Button>
        </form>
      </div>
    </div>
    </div>


  )
}

export default AdminUpdate