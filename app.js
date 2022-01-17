const express=require('express')
const mongoose = require('mongoose')
const authRoutes =require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());


//view engine
app.set('view engine','ejs');
//data base conection
 const dbURI ="mongodb+srv://chris:chris@cluster0.k1npp.mongodb.net/customer-user?";
 mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => console.log('db conected'))
 .catch((err) => console.log(err));

 app.listen(3000);
//routes
 app.get('/',(req,res)=>{res.render('home')});
 app.get('/smoothies',(req,res)=>{res.render('smoothies')});
 app.use(authRoutes);

//cookie
app.get('/set-cookies',(req,res)=>{
     
    res.setHeader('Set-Cookie','newUser=true');
    res.send('i  got cookie');

});
app.get('/read-cookie',(req,res)=>{

})