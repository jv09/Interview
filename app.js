
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser} = require('./middleware/authMiddleware');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const options = require('./src/admin_options');
var Topic = require('./models/topic');

AdminBro.registerAdapter(AdminBroMongoose);

const app = express();


// middleware
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const ADMIN = {
  email:'jatin@google.com',
  password:'jatin123',
};

// database connection
const run = async() => {
const dbURI = 'mongodb+srv://jatin:test123@cluster0.ofoob.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result)=>{
    console.log('connected');
    app.listen(3000);
    const admin = new AdminBro(options);
     const router = AdminBroExpress.buildAuthenticatedRouter(admin,{
       cookieName: 'admin-bro',
       cookiePassword: 'H@123',
       authenticate: async (email, password) =>{
         if (email===ADMIN.email && password=== ADMIN.password){
           return ADMIN
         }
         return null
       }
     });
     app.use(admin.options.rootPath, router);

  })

  .catch((err) => console.log(err));

};

run();
// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.get('/topic',requireAuth ,function(req,res){
  Topic.find({},function (err,docs){
    if (err) throw err;
    else res.render('index',{title : "jv",reports: docs});
});
});

app.use(authRoutes);
