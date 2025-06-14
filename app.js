require("dotenv").config();

const express = require('express');

const path = require('path')
const router = express.Router();
const staticrouter = require("./routes/route")
const blogrouter = require("./routes/blog")

const app = express();

const mongoose = require("mongoose");
const cookiePaser = require('cookie-parser')
const {checkForAuthenticationCookie} = require("./middleware/authentication")
const {Blog} = require('./models/blog')

mongoose.connect(process.env.MONGO_URL).then((e)=> console.log("mongodb connected"))

app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'))

app.use(express.static(path.resolve("./public")));

app.use(cookiePaser())

//middleware below for verify token and inject req.user to header
app.use(checkForAuthenticationCookie("token"))


//seting this because it send '/favicon.ico' on / router thus in 'app.get('/:id')' is misunderstand favicon.ico as id and thus give mongodb cast error like  this -- "app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/favicon.ico', (req, res) => res.status(204).end());

//all router are mount in express router

app.use(router,staticrouter,blogrouter)

router.get('/',async(req,res)=>{ 
    // console.log(req.user)
    const allBlogs = await Blog.find({})
     return res.render('home',{
        user:req.user,
        blogs:allBlogs,
     });
})





app.listen(process.env.PORT || 8000,()=>{
    console.log(`listen on ${process.env.PORT}`);
})


module.exports = app;