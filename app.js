const express=require('express')
const mongoose = require('mongoose')
const authRoutes =require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth , checkUser  } = require('./middleware/authMiddleware')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine','ejs');
//data base conection
 const dbURI ="mongodb+srv://chris:chris@cluster0.k1npp.mongodb.net/customer-user?";
 mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => console.log('db conected'))
 .catch((err) => console.log(err));

 app.listen(3000);
//routes
 app.get('*',checkUser); //every routes
 app.get('/',(req,res)=>{res.render('home')});
 app.get('/smoothies',requireAuth,(req,res)=>{res.render('smoothies')});
 app.use(authRoutes);

//cookie
app.get('/set-cookies',(req,res)=>{
     
    // res.setHeader('Set-Cookie','newUser=true');
//maxAge is session
    res.cookie('newUser',false);
    //secure:true means present in secure connection
    //https0ly:accessed in backend only
    //maxAge:used to set session
    res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true})
    res.send('i  got cookie');

});
app.get('/read-cookie',(req,res)=>{
      const cookies=req.cookies;
      console.log(cookies.newUser);
      res.json(cookies);
})