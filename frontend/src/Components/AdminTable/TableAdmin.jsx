import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {useNavigate  , Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}


function TableAdmin() {

  const [userdata , setUserdata]  = useState([])
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/users/read').then((response)=>{
          console.log(response);
          setUserdata(response.data)
        })
    },[])

    const DeleteUser = async(id,Transition) =>{
       
          try {
            const config = {
              headers: {
                  "Content-type": "application/json",
              },
          }

            await axios.delete(`/api/users/delete/${id}`,{
              
            },config)

            setTransition(() => Transition);
            setOpen(true);
            setTimeout(()=>{
              window. location. reload()
            },1000)
          } catch (error) {
            
          }
        
    }

    const editUser = (id) => {
        navigate(`/adminupdate/${id}`)
    }


   
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
        <TableContainer component={Paper} style={{border:'2px solid black',marginTop:'10px'}} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{borderBottom:'2px solid black'}}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Edit User</TableCell>
            <TableCell align="left">Delete User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userdata.map((obj,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell >{obj._id} </TableCell>
              <TableCell component="th" scope="row" align="left">
               {obj.name}
              </TableCell>
              <TableCell align="left">{obj.email} </TableCell>
              <TableCell align="left">{obj.phone} </TableCell>

            
        
            
            <TableCell align="left">
        
              <Button variant="outlined" onClick={()=>editUser(`${obj._id}`)} startIcon={<EditIcon/>} >Edit</Button>
      
              </TableCell>
          
             
              <TableCell align="left">
                <Button onClick={()=>DeleteUser(`${obj._id}`,TransitionLeft)}    variant="outlined" color="error" startIcon={<DeleteIcon />}  >Delete</Button>
                <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Deleted."
        key={transition ? transition.name : ''}
      />
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TableAdmin;