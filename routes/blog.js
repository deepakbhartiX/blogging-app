const {Router}= require("express")
const staticrouter = Router();
const multer = require('multer')
const path  = require('path')
const {Blog} = require('../models/blog') 
const {Comment} = require('../models/comment')
const storage = multer.diskStorage({
        destination: function (req,file,cb){
         cb(null,path.resolve(`./public/uploads/`)
        )},
        filename: function(req,file,cb){
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null,fileName);
        },
    
})

const upload = multer({storage:storage})



staticrouter.get('/add-new-blog',(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    })
})

staticrouter.post('/add-new-blog',upload.single('coverimage'),async(req,res)=>{

    const {title,body} = req.body;
     const blog = await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`uploads/${req.file.filename}`
     })



    return res.redirect(`/${blog._id}`);
})


staticrouter.get('/:id',async(req,res)=>{

     

    const blog = await Blog.findById(req.params.id).populate('createdBy');

    const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");


//    console.log(comments)
    return res.render('blog',{
        user:req.user,
        blog:blog,
        comments,
    })
})


staticrouter.post('/comment/:blogId',async(req,res)=>{
   const comment = await Comment.create({
     content:req.body.content,
     blogId: req.params.blogId,
     createdBy:req.user._id,

   })

   return res.redirect(`/${req.params.blogId}`)
})
module.exports= staticrouter

