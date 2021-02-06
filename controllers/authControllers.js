const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Topic = require("../models/topic");
const Question = require("../models/question");
const Interview = require("../models/interviewexp")
const Company = require('../models/company')


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'token secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }

module.exports.question_get = function(req,res){
    const topic = req.params.topic;
    var a=[];
    Question.find()
    .populate('topic')
    .exec(function (err, topics) {
        if (err) return handleError(err);
        else{
          topics.forEach(element => {
            if(element.topic.topic===topic && element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('questions',{title:topic, questions:a,});
    });
}

module.exports.addQuestion_get = (req,res) => {
  Topic.find()
  .then(result=>{
      res.render('addQuestion',{topics: result});
  })
  .catch(err=>{
        console.log(err);
  });
}

module.exports.addQuestion_post= async(req,res)=>{
  const {question,topic,link}=req.body;
    try{
      var ques;
        if(topic!="1"){
          ques= new Question({question:question,link:link,topic:topic,display:false});
          const resp=await ques.save();
        }
        
      res.status(201).json({ques:ques._id});
      
    }
    catch(err){
      const errors= errorHandler(err);
      
      //console.log(err);
      res.status(400).json({errors});
    }}

    module.exports.addTopic_post = async(req,res) => {
      var obj={
        topic:req.body.topic,
        display:false,
      }
      Topic.create(obj, (err, item) => {
       if (err) {
           console.log(err);
       }
       else {
           // item.save();
           res.redirect('/addQuestion');
       }
    });
  }


  module.exports.interviewExperience_get=(req,res)=>{
    const company = req.params.company;
    var a=[];
    Interview.find()
    .populate('company')
    .exec(function (err, companies) {
        if (err) return handleError(err);
        else{
          companies.forEach(element => {
            if(element.company.company=== company && element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('interviewExp',{title:company, items:a,})
    });
  }
  module.exports.name_get = (req,res)=>{
    const company = req.params.company;
    const name= req.params.name;
    var a=[];
    Interview.find()
    .exec(function (err, topics) {
        if (err) return handleError(err);
        else{
          topics.forEach(element => {
            if(element.name === name&& element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('intername',{ title :company,questions:a})
    });
  }
  module.exports.addCompany_get = (req,res)=>{
    Company.find({},function (err,docs){
      if (err) throw err;
      else res.render('addCompany',{reports: docs});
  });
  }
  
  module.exports.addExperience_get = (req,res)=>{
    Company.find({},function (err,docs){
      if (err) throw err;
      else res.render('addExperience',{reports: docs});
  });
  }