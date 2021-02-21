const mongoose = require('mongoose')

const Schema=mongoose.Schema;

const topicSchema= new mongoose.Schema({
    topic:{
        type: String,
        
        unique:true,
    },

    
    
}); 

global.topicSchema = global.topicSchema || mongoose.model('topic', topicSchema);
module.exports = global.topicSchema;

//const Topic= mongoose.model('topic',topicSchema);
//module.exports=Topic;