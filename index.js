
require('dotenv').config()
// acquire all the function of express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 8000
const mongoose = require('mongoose')
const validator = require('validator');
const { ReplSet } = require('mongodb');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./authenticated/auth')
const cookieParser = require('cookie-parser')

// for ejs view engine
app.set('view engine' , "ejs");
// using for static file all the related static file we have to store in the views folder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));


mongoose.connect('mongodb+srv://ankit-kumar:Ankit12@3@typing-website.aia5b.mongodb.net/typing-website' , {
    useNewUrlParser:true , 
    useCreateIndex:true, 
    useUnifiedTopology:true
})

const User = require('./models/user')

// Routing part 
app.get('/', auth,(req,res)=>{
    try {
        res.status(200).render('indexNew')
    } catch (e) {
        res.status(500).render('index')
    }
})

app.get('/logo' , auth , (req, res)=>{
    res.redirect('/')
})

app.get('/signup', (req, res)=>{
    try {
        res.status(200).render('signup')
    } catch (e) {
        res.status(500).render('profile')
    }
})

app.get('/login',(req, res)=>{
    try {
        res.status(200).render('login')
    } catch (e) {
        res.status(500).render('profile')
    }
})

app.get('/practice', auth,(req, res)=>{
    try {
        res.status(200).render('HomePageindex')
    } catch (e) {
        res.status(500).render('profile')
    }
})


app.get('/practice/homeRow' ,(req, res)=>{
    res.redirect('/practice')
})

app.get('/practice/topRow' ,(req, res)=>{
    try {
        res.status(200).render('TopPageIndex')
    } catch (e) {
        res.status(500).render('profile')
    }
})

app.get('/practice/bottomRow' ,(req, res)=>{
    try {
        res.status(200).render('BottomPageIndex')
    } catch (e) {
        res.status(500).render('profile')
    }
})

app.get('/practice/wordPractice' ,(req, res)=>{
    try {
        res.status(200).render('WordPageIndex')
    } catch (e) {
        res.redirect('/login')
    }
})

app.get('/logout',auth,async (req,res)=>{
    try
    {
        console.log(req.user)
        res.clearCookie('jwt')
        console.log("Connection Successfully")
        await req.user.save();
        res.redirect('/')
    }catch(error){
        console.log(error)
        res.status(500).render('profile')
    }
})

app.get('/profile' ,(req ,res)=>{
    res.status(500).render('profile')
})

app.get('/howtostart' ,auth,(req ,res)=>{
    res.status(200).render('howtostart')
})

app.post('/signup' ,async (req,res)=>{
    const p1 = req.body.psw
    const p2 = req.body.pswRepeat
    if (p1 === p2 && p1.length >=7)
    {
        const me = new User({
            name: req.body.name ,
            email:req.body.email ,
            password:req.body.psw
        })

        const token =await me.generateAuthToken()
        // console.log(token)
        // Before saving it runs the hashing process
        me.save().then((result)=>{
            console.log(result)
            res.redirect('/login')
        }).catch((error)=>{
            res.send('Email Already Registered ' + error)
        })
    }
    else
    {
        res.send("password did not match and length must be greater than six character")
    }
})

app.post('/login' ,async (req, res)=>{
    const userName = req.body.uname
    const password = req.body.psw
    const user = await User.findOne({email:userName})
    // console.log(user.password)

    // console.log(user)
    if (user === null)
    {
        res.redirect('/login')
    }
    else
    {
        const isMatch = await bcrypt.compare(password , user.password)

        if (!isMatch)
        {
            res.redirect('/login')
        }

        const token =await user.generateAuthToken()

        res.cookie('jwt' , token, {
            // Three day validation 
            expires:new Date(Date.now() + 1000*60*60*24*100),
            secure:false
        })

        if(!isMatch)
        {
            // res.status(401).send("Unable to login")
            res.redirect('/login')
        }
        else
        res.render('indexNew')
    }
})

app.listen(port, () => {
    console.log(`Server started on port 8000`);
})
