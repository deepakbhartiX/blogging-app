//here using {Router} mean taking "Router" function from express.Router() so donn't be confuse about it....

const {Router}= require("express")
const User = require("../models/user")



const staticrouter = Router();

staticrouter.get('/signup',(req,res)=>{
    return res.render("signup")
})

staticrouter.get('/signin',(req,res)=>{
    return res.render("signin")
})

staticrouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndGenToken(email,password);

        return res.cookie("token",token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:'Incorrect Email or Password'
        }) 
    }
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


staticrouter.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})

module.exports= staticrouter