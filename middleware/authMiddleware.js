//verify json web token
const jwt = require("jsonwebtoken");
const User = require('../models/User');

const requireAuth =(req,res,next)=>{
      const token = req.cookies.jwt;
 //check json web token exists & verified
 if(token){
      jwt.verify(token,'yubahwe secret',(err,decodedToken)=>{

         if(err){
             console.log(err.message);
             res.redirect('/login');
         }else{
             console.log(decodedToken);
             next();
         }
      })
 }else{
     res.redirect('/login');
 }
}
//check current user
 const checkUser = (req,res,next)=>{
     const token = req.cookies.jwt;
  if(token){
       jwt.verify(token,'yubahwe secret', async (err,decodedToken)=>{
      if(err){
          console.log(err);
          res.locals.user = null; //if no user logged in
          next();
      }else{
          //inject data in view if logged in
          console.log(decodedToken);
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
      }

})
  }else{
       res.locals = null;
       next();
  }
}
module.exports = { requireAuth, checkUser };