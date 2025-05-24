const {Router}= require("express")
const staticrouter = Router();

staticrouter.get('/add-new-blog',(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
})

module.exports= staticrouter