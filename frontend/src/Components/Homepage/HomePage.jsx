import React, { useEffect } from 'react'
import Navbar from '../NavBar/Navbar'
import './HomePage.css'
import {useNavigate} from 'react-router-dom'
import Cards from '../Cards/Cards'


function HomePage() {

  const navigate = useNavigate()

  useEffect(()=>{
    const userInfo = localStorage.getItem('userInfo')
    if(!userInfo){
      navigate('/')
    }

  },[navigate])
  
  return (
    <div>
        <Navbar/>
        <Cards/>
    </div>
  )
}

export default HomePage