import React, { useState  } from 'react'
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



function AdminHead() {

  


    const navigate = useNavigate()
    const [search , setSearch] = useState('')
    const [data,setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const adminlogoutHandler = () => {
        localStorage.removeItem('AdminInfo');
       alert("BYE BYE")
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
      setData(data)
     
      } catch (error) {
        
      }
    }

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
      <input   type="search" placeholder='Search' onChange={(e)=>setSearch(e.target.value)} value={search}  style={{height:"40px", borderRadius:'10px' ,border:'2px black solid', marginRight:'10px',outline:'none' , backgroundColor:'#c5cae9'}}  />
     
      <Button type='submit' variant="contained" color="success" startIcon={<SearchIcon/>}>Search</Button>
    </form>
     
    
     {/* <Link to='/admincreate'> */}
     <Button variant="contained" color="inherit" style={{color:'black',marginRight:'10px'}} onClick={create} startIcon={<AddIcon/>}> Createuser</Button>
     {/* </Link > */}
     <Button color="error" variant="contained" onClick={adminlogoutHandler} startIcon={<LogoutIcon/>} >Logout</Button>
   </Toolbar>
 </AppBar>
 
</Box>


<Container maxWidth="lg" style={{marginTop:'10px'}}>
<Box  >
{data && data.length > 0 && 
 <TableContainer  style={{border:'2px solid #2196f3'}}  component={Paper}>
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
   <TableBody >
     {data.map((obj,index) => (
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
   
         <Button variant="outlined" onClick={()=>editUser(`${obj._id}`)}  startIcon={<EditIcon/>} >Edit</Button>
     
         </TableCell>
     
        
         <TableCell align="left">
                <Button onClick={()=>DeleteUser(`${obj._id}`,transition)}    variant="outlined" color="error" startIcon={<DeleteIcon />}  >Delete</Button>
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
}
</Box>
</Container>
</div>
  )
  
}



export default AdminHead