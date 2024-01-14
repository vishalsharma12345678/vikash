const express = require('express');
const routes = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { isLogined } = require('../middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../front-end/public/uploads/');
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

routes.post('/signup',upload.single('img'),async (req,res)=>{
    let {username,email,password} = req.body
    let imageName = req.file.filename;
    const newuser = new User({username,email,img:imageName});
    try{
        await User.register(newuser,password);
        res.status(200).json({message:"User create successfully"});
    }
    catch(e){
        res.status(500).json({message:"User can't singup"});
    }
})

routes.post('/login', 

  passport.authenticate('local', { 
        failureRedirect: '/login',
        failureFlash: true
   }),

  async (req, res)=> {
    let user  = await User.findOne({username: req.body.username})
     res.status(200).json({message:"User login successfully",user:user});
});

routes.get('/logout',(req, res, next)=>{
    req.logout(function(err) {
      if (err) { 
        return res.status(401).json({message:"Again try to logout!"}); 
      }
    });
    
    res.status(200).json({message: 'logout successful'});
});

routes.get('/check-auth', (req, res) => {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = routes;