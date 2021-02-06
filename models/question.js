const mongoose = require('mongoose')

const Schema=mongoose.Schema;

const questionSchema= new mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    link:{
        type: String,
        required:true,
        unique:true
    },
    topic:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic',
        required: true, 
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 



//global.questionSchema = global.questionSchema || mongoose.model('question', questionSchema);
//module.exports = global.questionSchema;

const Question= mongoose.model('question',questionSchema);
module.exports=Question;