const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const companySchema= new mongoose.Schema({
    imag:{
        data: Buffer,
        contentType: String,
        required: false,
   },
   company:{
    type: String,
    required: false,
}
});
const Company= mongoose.model('company',companySchema);

module.exports=Company;