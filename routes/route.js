const {Router}= require("express")
const User = require("../models/user")



const staticrouter = Router();

staticrouter.get('/signup',(req,res)=>{
    return res.render("signup")
})


staticrouter.get('/signin',(req,res)=>{
    return res.render("signin")
})

staticrouter.post('/signup',async (req,res)=>{
    const {fullname,password,email} = req.body;
    const created = await User.create({
        fullname,
        password,
        email,
    });
    return res.redirect("/");
    
})

module.exports= staticrouter