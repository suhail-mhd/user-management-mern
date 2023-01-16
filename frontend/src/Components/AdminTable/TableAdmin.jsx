import React, { useState,useEffect  } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide'
import Popup from './Popup'
import { useRef } from 'react';


function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}


function TableAdmin() {

  const [userdata , setUserdata]  = useState([])
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const navigate = useNavigate();
    const [search , setSearch] = useState('')
  const [popup, setPopup] = useState({
    message:'',
    isLoading: false
  })

  const idProductRef = useRef();

    useEffect(()=>{
        axios.get('http://localhost:4000/api/users/read').then((response)=>{
          console.log(response);
          setUserdata(response.data)
        })
    },[])

    const adminlogoutHandler = () => {
      localStorage.removeItem('AdminInfo');
     alert("Are you sure?")
      navigate('/admin')
  }

  const create = () =>{
    navigate('/admincreate')
  }

  const searchHandler = async(e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
            "Content-type": "application/json",
        }
    }

    const {data} = await axios.post('/api/users/search',{
      search
    },config)
    setUserdata(data)
   
    } catch (error) {
      
    }
  }

    const handleDialog = (message, isLoading) => {
      setPopup({
        message,
        isLoading,

      })
    }

    const DeleteUser = async(id,Transition) =>{
      handleDialog('Are you sure you want to delete?',true)
      idProductRef.current = id;
       
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
          } catch (error) {
            
          }
        
    }

    const areUSureDelete = (choose) => {
      if(choose) {
        setUserdata(userdata.filter((obj) => obj._id !== idProductRef.current))
        handleDialog("",false)
      }else {
        handleDialog("",false)
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
      <Box sx={{ flexGrow: 1 }}>
 <AppBar position="static">
   <Toolbar>
     <IconButton
       size="large"
       edge="start"
       color="inherit"
       aria-label="menu"
       sx={{ mr: 2 }}
     >
       <MenuIcon />
     </IconButton>
     
     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       ADMIN
     </Typography>

     <form onSubmit={searchHandler} style={{marginRight:'10px'}} >
      <input   type="search" placeholder='Search' onChange={(e)=>setSearch(e.target.value)} value={search}  style={{height:"40px", borderRadius:'10px' ,border:'2px black solid', marginRight:'10px',outline:'none' , backgroundColor:'#c5cae9'}} />
    </form>
     
    
     {/* <Link to='/admincreate'> */}
     <Button variant="contained" color="inherit" style={{color:'black',marginRight:'10px'}} onClick={create} startIcon={<AddIcon/>}> Create user</Button>
     {/* </Link > */}
     <Button color="error" variant="contained" onClick={adminlogoutHandler} startIcon={<LogoutIcon/>} >Logout</Button>
   </Toolbar>
 </AppBar>
 
</Box>
{userdata && userdata.length > 0 && 
        <TableContainer component={Paper} style={{border:'2px solid black',marginTop:'10px',marginLeft:'30px',marginLeft:'30px', width:'81rem'}} >
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
          {userdata.filter((obj) => obj.name.includes(search)).map((obj,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell >{index} </TableCell>
              <TableCell component="th" scope="row" align="left">
               {obj.name}
              </TableCell>
              <TableCell align="left">{obj.email} </TableCell>
              <TableCell align="left">{obj.phone} </TableCell>

            
        
            
            <TableCell align="left">
        
              <Button onClick={()=>editUser(`${obj._id}`)} startIcon={<EditIcon/>} ></Button>
      
              </TableCell>
          
             
              <TableCell align="left">
                <Button onClick={()=>DeleteUser(`${obj._id}`,TransitionLeft)} color="error" startIcon={<DeleteIcon />}  ></Button>
                
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
}
    {popup.isLoading && <Popup onDialog={areUSureDelete} message={popup.message}/>}
    </div>
  )
}

export default TableAdmin;