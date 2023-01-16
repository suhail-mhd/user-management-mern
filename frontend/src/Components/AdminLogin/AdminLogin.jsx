import React,{useState} from 'react'
import './AdminLogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Errormessage from '../Errormessage'
import Validation from '../../Validation';




function AdminLogin() {
    const navigate = useNavigate()
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [error , setError]  =useState('')
    const [errors,setErrors] = useState({})
    
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
            setErrors(Validation(email,password))
        }
    }

  return (
    <div className='login_container'>
<div className='login_form_container'>
  <div className='left'>
    <form className='form_container' onSubmit={submitHandler}>
      <h1 style={{color:'#333'}}>Admin Login Account</h1>
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
    <h1>Welcome</h1>
    {/* <Link to="/signup">
      <button type="button" className='white_btn'>
        Sign Up
      </button>
    </Link> */}
  </div>
</div>
</div>
  )
}

export default AdminLogin