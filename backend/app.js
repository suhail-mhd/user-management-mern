const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./Middlewares/errorMiddleware');
const userRouter = require('./routes/userRouter')
const adminRoute = require('./routes/AdminRoute')
const cors = require('cors')


//Mongodb Connection
mongoose.connect('mongodb://localhost:27017/react-node',()=>console.log("Database connected"));
app.use(express.json())
app.use(cors())
app.use('/api/users',userRouter)
app.use('/api/Admin',adminRoute)
app.use(notFound);
app.use(errorHandler)


app.listen(port,()=>console.log(`Server is running on localhost ${port}`));
