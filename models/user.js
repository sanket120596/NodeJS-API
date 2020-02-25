const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 35,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age cannot be less than 0");
      }
    },
    trim: true
  },
  email:{
      type:String,
      unique:true,  
      required:true,
      trim:true,
      lowercase:true, 
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error('Email is invalid');
          }
      }
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot be password");
      }
    }
  },
  avatar:{
    type:Buffer
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
},{timestamps:true});

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
   const user = this;
   const token = jwt.sign({_id:user._id.toString()},'itzMeSank');
   
   user.tokens = user.tokens.concat({token})
   await user.save();

   return token;
}

userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

userSchema.statics.findByCredentials = async(email,password) => {
  console.log(email);
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to Log-In')
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to Log-In');
    }
    return user;
}

userSchema.pre("remove",async function(next){
  const user = this;
  console.log('removing tasks')
  await Task.deleteMany({owner:user._id}) 
  next()
} )


//Hash the plane txt password b4 saving
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password,8)
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
