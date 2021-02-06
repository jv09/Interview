const { Router } = require('express');
const authController = require('../controllers/authControllers');
const Interview = require('../models/interviewexp')
const Company = require('../models/company');
const Topic = require('../models/topic');
const Question = require('../models/question');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const User = require('../models/User');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
  var upload = multer({ storage: storage });

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/topic/:topic',authController.question_get);
router.get('/addQuestion',requireAuth,authController.addQuestion_get);
router.post('/addQuestion',requireAuth,authController.addQuestion_post);
router.post('/topic',requireAuth,authController.addTopic_post);
router.get('/interviewExperience',requireAuth,function(req,res){
    Company.find({},function(err,docs){
        if (err) throw err;
        else res.render('company',{reports: docs});
    });
});

router.get('/interviewExperience/:company', requireAuth ,authController.interviewExperience_get);
router.get('/interviewExperience/:company/:name', requireAuth ,authController.name_get);
router.get('/addCompany',requireAuth ,authController.addCompany_get);
router.get('/addExperience',requireAuth ,authController.addExperience_get);

router.post('/addCompany',requireAuth , upload.single('imag'),(req, res, next) => {
    var name= req.body.company;
    if (name!='')
    {
  
   
    var obj2 = {
      company: req.body.company,
      imag:{
        data: fs.readFileSync(path.join('C:/Users/DELL/inteviewtracker/public/' + req.file.filename)),
        contentType: 'image/png'
      },
    } 
    Company.create(obj2, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/addExperience')
      }
    
  });
    }
    else
    {
      res.redirect('/addExperience')
    }
  });
  router.post('/addExperience',requireAuth , upload.single('img'),(req, res, next) => {
    var obj = {
      name: req.body.name,
      year: req.body.year,
      college: req.body.college,
      description: req.body.description,
      company: req.body.company,
      img: {
        data: fs.readFileSync(path.join('C:/Users/DELL/interviewtrakcer/public/' + req.file.filename)),
            contentType: 'image/png'
      },
    } 
    Interview.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/interviewExperience');
      }
  });
  });

module.exports = router;

