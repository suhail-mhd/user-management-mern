const User = require("../model/userModel");
const asynchandler  = require('express-async-handler');
const generateToken = require("../Util/generateToken");

//// handling sign up route..


const registerUser  = asynchandler(async (req,res)=>{
    const {email,name,password,phone} = req.body


    // Checking user exist or not
    const UserExist = await User.findOne({email});

    if(UserExist){
        res.status(400);
        throw new Error("user already exist")
    }


    // If it was a new user 

    const user  = await User.create({
        name,email,phone,password
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone  
        })
    }else{
        res.status(400)
        throw new Error("Error Occured");
    }

});




// handling Login Request 


const AuthUser  = asynchandler( async(req,res)=>{
    const {email,password} = req.body

    // checking if there is user or not.
    const user = await User.findOne({email});

    // if user exist checking the bcrpted password form userModel with the fucntion matchpassword and passing password as argument.
    if(user && await user.matchPassword(password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Email or password");
    }
    

});


//getallUsers Details
const ReadData = asynchandler(async(req,res)=>{
  try {
      const users = await User.find({})
      res.json(users)
  } catch (error) {
      res.json(error)
  }

})


//getuserDetails  Details
const getUser = asynchandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const user =await User.findById(id);
        res.json(user);
    } catch (error) {
        res.error("Invalid data");
    }
})


//update users
const updateUser = asynchandler(async(req,res)=>{
  const newUserData ={
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone
  }

  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  })
  res.status(200).json(user)
})

//delete user
const deleteuser = asynchandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    await user.remove()
    res.json({})
})


//searching finding user

const AllUsers = asynchandler(async(req,res)=>{
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

const SearchUser = asynchandler(async(req,res)=>{
    const { search } = req.body;

   try {
    const users = await User.find({name:search})
    res.json(users)
   } catch (error) {
       res.json(error)
   }
})

module.exports  = {registerUser ,AuthUser , ReadData ,getUser ,updateUser,deleteuser ,AllUsers ,SearchUser}