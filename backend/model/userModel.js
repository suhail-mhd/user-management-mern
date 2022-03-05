const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


// Creating Schema
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        phone:{
            type:Number,
            required:true
        },
      
    },
    {
        timestamps:true,
    }
);

// Bcrypting password..

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// decrypting password..

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}


// Exporting 
const User = mongoose.model('User',userSchema);

module.exports  =User;