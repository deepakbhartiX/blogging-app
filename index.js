const express = require('express');
const path = require('path')
const router = express.Router();
const staticrouter = require("./routes/route")
const PORT = 8000
const app = express();

app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'))
app.use(router);
app.use(staticrouter)


router.get('/',(req,res)=>{
     return res.render('home');
})


app.listen(PORT,()=>{
    console.log(`listen on ${PORT}`);
})