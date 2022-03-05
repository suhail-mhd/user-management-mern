import React, { useEffect } from 'react'
import AdminHead from '../AdminHeader/AdminHead'
import TableAdmin from '../AdminTable/TableAdmin'
import {useNavigate} from 'react-router-dom'



function AdminHomepage() {


  const navigate = useNavigate()

  useEffect(()=>{
    const AdminInfo = localStorage.getItem('AdminInfo')
   if(AdminInfo){
     navigate('/adminhomepage')
   }else{
     navigate('/admin')
   }
  },[navigate])
  return (
    <div>
        <AdminHead/>
        <TableAdmin/>
    </div>
  )
}

export default AdminHomepage