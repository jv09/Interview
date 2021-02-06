const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const interviewSchema= new mongoose.Schema({
    img:{
         data: Buffer,
         contentType: String
    },
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true,
    },
    year:{
        type: String,
        required: true,
    },
    college:{
        type: String,
        required: true,
    },
   company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
},
display:{
    type: Boolean,
    default: true,

}
}); 

const Interview= mongoose.model('interview',interviewSchema);
module.exports=Interview;