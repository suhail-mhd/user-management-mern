import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from 'axios';

function Cards() {

  const [data,setData] = useState([]);

  useEffect(()=>{
    axios.get('https://fakestoreapi.com/products').then((res)=>{
      // console.log(res.data);
      setData(res.data)
    })
  },[])


  console.log(data);
  return (
    <div>
       <Grid container item md={6} lg={12} sm={12} style={{marginTop:"10px"}}>
      

      {
        data.map((obj)=>{
          return(
            <Card sx={{ maxWidth: 345 }} style={{marginLeft:'30px',marginTop:'10px',width:'400'}}>
            <CardMedia className='CardImg'
              component="img"
              height="300"
              image={obj.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {obj.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {obj.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          )
        })
      }
       

       </Grid>
    </div>
  )
}

export default Cards