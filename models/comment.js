const {Schema,model} = require('mongoose')

const commentSchema = new Schema({

    content:{
        type:String,
        required:true,
    },

    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog",
    
    },

    createdBy:{
    type:Schema.Types.ObjectId,
    ref:"Users",
    }


},{timestamps:true})


const Comment = model('comment',commentSchema);


module.exports ={
    Comment
}