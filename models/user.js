const mongoose = require('mongoose')
const bcrypt= require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        trim :true , 
        required : true 
    },
    email:{
        type:String,
        required:true ,
        trim:true ,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value))
            throw new Error('Email is Invalid')
        }
    },
    password:{
        type:String, 
        required:true,
        trim:true,
        minlength:7
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


userSchema.methods.generateAuthToken = async function(){
    console.log(process.env.SECRET)
    try{
        const token = jwt.sign({_id:this._id.toString()} , process.env.SECRET)
        
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token 
    }catch(error){
        res.status(501).send("ERROR " + error)
    }
}

// This function runs before saving our data in our database
userSchema.pre('save' , async function(next){
    if (this.isModified('password')){
        this.password =await bcrypt.hash(this.password,10)
    }
    next();
})


const User = new mongoose.model('User', userSchema)

module.exports = User ; 