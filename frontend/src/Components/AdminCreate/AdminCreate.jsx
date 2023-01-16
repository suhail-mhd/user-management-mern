import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Errormessage from '../Errormessage'
import {useNavigate} from 'react-router-dom'
import './create.css'
import Button from '@mui/material/Button';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import Validation from '../../Validation';


function AdminCreate() {


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
      const AdminInfo = localStorage.getItem('AdminInfo');

      if(AdminInfo){
        navigate('/admincreate')
      }else{
        navigate('/admin')
      }
    },[navigate])



    const registerUser= async(e) =>{
        e.preventDefault()
      // console.log(name , email , number , password);
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

          navigate('/adminhomepage')
          console.log(data);
        } catch (error) {
          setErrors(Validation(name,email,phone,password))
        }
      }
      }

      const backtohomepage = () => {
        navigate('/admin')
      }
  

  return (

    <div className='signup_container'>
    <div className='signup_form_container'>
      <div className='right'>
        <h1>New One!</h1>
      </div>
      <div className='left'>
        <form className='form_container' onSubmit={registerUser}>
          <h1 style={{color:'#333'}}>Create User</h1>
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
            Create
          </button>
          <Button variant="contained" color="primary" onClick={backtohomepage} startIcon={<HomeSharpIcon/>} >Back to Homepage</Button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AdminCreate