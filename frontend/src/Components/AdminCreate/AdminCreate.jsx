import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Errormessage from '../Errormessage'
import {useNavigate} from 'react-router-dom'
import './create.css'
import Button from '@mui/material/Button';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

function AdminCreate() {


    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [password , setPassword] = useState("");
    const [Confirmpassword , setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)
    const [error,setError] = useState(false)
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
          setError("Error while signup check your data")
        }
      }
      }

      const backtohomepage = () => {
        navigate('/admin')
      }
  

  return (
    <div className='signupBox'>
     <form className='box'  onSubmit={registerUser}>
      <h1>Create User</h1>
      {error && <Errormessage>{error}</Errormessage>}
      {message && <Errormessage >{message}</Errormessage> }
      <input type="text" onChange={(e)=>setName(e.target.value)} value={name}  placeholder="name"/>
      <br/>
      <input type="email"  onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email"/>
      <br/>
      <input type="number"  onChange={(e)=>setPhone(e.target.value)} value={phone} placeholder="Phone"/>
      <br/>
      <input type="password"  onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password"/>
      <br/>
      <input type="password"  onChange={(e)=>setConfirmPassword(e.target.value)} value={Confirmpassword} placeholder="Confirm Password"/>
      <br/>
      <input type="submit" value="Create"/>
      
    <Button variant="contained" color="success" onClick={backtohomepage} startIcon={<HomeSharpIcon/>} >Back to Homepage</Button>
    </form>
    </div>
  )
}

export default AdminCreate