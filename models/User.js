const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
       email:{
          type:String,
          required:[true,'Please enter Email'],
          unique:true,
          lowercase:true,
          //validate email
          validate:[isEmail,'Please Enter a valid Email']
     },
       password:{
           type:String,
           required:[true,'Please enter a password'],
           minlength:[6,'Minimum length of password is 6 charcter']
   },
})
       //hooks
//fire a function after doc saved to database
       
//           userSchema.post('save',function(doc,next){
//            console.log('new user was created & saved',doc);
//            next();
//   })

  /*fire function before  doc saved
  userSchema.pre('save',function(next) {
   console.log('user about created and saved',this);
   next();
   })*/
// method to hash password before saved to database
     userSchema.pre('save',async function(next) {
     const salt =await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password,salt);
     next();
})
     const User =  mongoose.model('user',userSchema);
module.exports=User;