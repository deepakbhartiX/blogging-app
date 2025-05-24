const express = require('express');
const path = require('path')
const router = express.Router();
const staticrouter = require("./routes/route")
const blogrouter = require("./routes/blog")
const PORT = 8000
const app = express();
const mongoose = require("mongoose");
const cookiePaser = require('cookie-parser')
const {checkForAuthenticationCookie} = require("./middleware/authentication")



mongoose.connect('mongodb://localhost:27017/Blogging').then((e)=> console.log("mongodb connected"))

app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'))


app.use(cookiePaser())

//middleware below for verify token and inject req.user to header
app.use(checkForAuthenticationCookie("token"))


//all router are mount in express router

app.use(router,staticrouter,blogrouter)

router.get('/',(req,res)=>{ 
    console.log(req.user)
     return res.render('home',{
        user:req.user,
     });
})


app.listen(PORT,()=>{
    console.log(`listen on ${PORT}`);
})