const User = require('../models/User');
const jwt = require('jsonwebtoken')
//functions to handle an errors
    const handleErrors =(err)=>{

       console.log(err.message,err.code);
       let errors = {email:'',password:''};
//incorrect email
   if(err.message === 'incorrect email'){
     errors.email = 'that email is not  registered'
   }
   //incorrect password
   if(err.message === 'incorrect email'){
    errors.password = 'that password is not  registered'
  }
// duplicate error code
        if(err.code===11000){

         errors.email="That emaiil is already registerd"
         return errors;
     }
       //validation errors
        if(err.message.includes('user validation failed')){
      //to get values of object in errors

          Object.values(err.errors).forEach(({properties}) =>{
               //to access email and password  by errors
              errors[properties.path] = properties.message;
          })
       }
         return errors;
} 
 const maxAge = 3*24*60*60;
  const createToken = (id)=>{
    return jwt.sign({id},'yubahwe secret',{ expiresIn: maxAge});
  }
module.exports.signup_get=(req,res)=>{

                   res.render('signup');
}

module.exports.login_get=(req,res)=>{
       res.render('login');
}

module.exports.signup_post=  async(req,res)=>{
         const{ email,password }=req.body
         //to make user signup
       try{
            const user = await User.create({ email , password });
            const token = createToken(user._id);
            res.cookie('jwt', token,{ httpOnly:true, maxAge: maxAge*1000} );
            res.status(201).json({user: user._id});
       }catch(err){
              const errors = handleErrors(err);
             res.status(400).json({errors});
       }      
}
module.exports.login_post= async (req,res)=>{
         const{ email,password }=req.body

    try {
      const user = await User.login(email,password);
      const token = createToken(user._id);
      res.cookie('jwt',token,{ httpOnly:true, maxAge: maxAge*1000 })
      res.status(200).json({user:user._id});
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

