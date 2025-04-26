const {Schema,model} = require('mongoose');

const userSchema = new Schema({

    fullname:{
        type:String,
        require:true,
    
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    salt:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
     
        unique:true,
    },

    profileImageURL:{
        type:String,
        default:"/images/useravatar.jpg"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
 
    }

},{ timestamps:true})


const User = model('blogginguser',userSchema);

module.exports = User;