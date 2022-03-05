const Admin = require('../model/AdminModel');
const generateToken  = require('../Util/generateToken');
const asynchandler  = require('express-async-handler')


const AdminAuth = asynchandler(async(req,res)=>{
    const{email,password} = req.body
    
    const adminEmail = await Admin.findOne({email});
    const adminPassword  = await Admin.findOne({password})

    if(adminEmail && adminPassword ){
        res.json({
            _id:adminEmail._id,
            email:adminEmail.email,
            token:generateToken(Admin._id)
        })
    }else{
        res.status(400)
        throw new Error("Admin Login Failed");
    }
})






module.exports = {AdminAuth}