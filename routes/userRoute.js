const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../controllers/userContoller');


const verifyToken = (req,res,next) => {
    // console.log("In verify token",req.headers.authorization);
   if(!req.headers.authorization) {
      return res.status(401).send('unauthorized user');
   }
   let token = req.headers.authorization.split(' ')[1];
   
   if(token) {
        var decoded = jwt.verify(token,'secretKey');
        req._id = decoded.subject;
        next();   
   }
   else {
        res.status(404).send('No Token');
    }
}

router.post('/register',user.registerUser);
router.post('/login',user.loginUser);
router.post('/contact',verifyToken,user.createContact);
router.get('/contact',verifyToken,user.getContact);
router.delete('/contact/:name',verifyToken,user.deleteContact);
//router.get('/getusers',verifyToken,user.getUsers);



module.exports = router;