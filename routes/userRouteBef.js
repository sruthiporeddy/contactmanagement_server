const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const models = require('../models/management');
const mongoose = require('mongoose');

const Contact = models.Contact;
const User = models.User;
const Management = models.Management;

const verifyToken = (req,res,next) => {
    // console.log("In verify token",req.headers.authorization);
    if(!req.headers.authorization) {
       return res.status(401).send('unauthorized user');
    }
    let token = req.headers.authorization.split(' ')[1];
    
    if(token === null ) {
        return res.status(401).send('unauthorized user');
    }
    let verifiedToken = jwt.verify(token,'secretKey');
    if(!verifiedToken) {
        return res.status(401).send('unauthorized user');
    }
    req._id = verifiedToken.subject;
    next();
}

router.post('/register', (req,res)=> {
    let newuser = new Management(req.body);
    
    // console.log('manageUser', newuser);
    newuser.save((err,regUser) => {
       // console.log("result",err,regUser);
        if(err) {
            if(err.code === 11000){
                return res.status(400).send('Duplicate email ');
            }
            // console.log(err);
            res.status(401).send("Error occured while registering user");
        } else {
            // let payload = { subject: regUser._id };
            // let token = jwt.sign(payload,'secretKey');
           // console.log(token);
            //console.log({token});
            res.status(200).send();
        }
    })  
})


router.post('/login',(req,res) => {

    Management.findOne({email:req.body.email},(err,user) => {
        if(err) {
            // console.log(err);
            res.status(501).send("Internal error")
            } else
            if(!user){
               //  console.log("no user");
                res.status(401).send("Unauthorized User"); 
            } else 
                if(user.password!== req.body.password) {
                    res.status(401).send('Invalid password');
                } 
                else {
                    let payload = { subject:user._id };
                    let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
            }
    })
    
    
})

router.post('/contact',verifyToken,(req,res) => {
     let id = req._id;
    // console.log(req.body);
    Management.findById({_id:id},(err,contact) => {
       // console.log(contact);
        if(err) {
            return res.status(404).send('Unauthorized User');
        } else {
            if(!contact) {
                return res.status(404).send('No contact added');
            } else {
                contact.contacts.push({contactname:req.body.contactname,phonenumber : req.body.phonenumber,
                address : req.body.address});
                contact.save((err,management) => {
                // console.log('inside',management);
                
                res.status(200).send();
                })
            }
            
        }
    })
       
});
     

router.get('/contact',verifyToken,(req,res) => {
   //  console.log("in get login");
    let id = req._id;
    Management.findById({_id:id},(err,contact) => {
        // console.log(contact)
        if(err) {
            res.status(401).send("unauthorized user");
        }
        if(!contact) {
               return res.status(404).send("No Contacts found");
        } 
        // console.log(contact.contacts);
        res.status(200).send(contact.contacts);
        })
            
});



router.delete('/contact/:name', verifyToken,(req,res) => {
   // console.log('delete');
    let name = req.params.name;
   // console.log(name);
    let id = req._id;
    Management.findById({_id:id},(err,contact) => {
       // console.log(contact);
        contact.contacts.forEach(element => {
            if(element.contactname === name){
                element.remove();
                // console.log(contact);
                contact.save((err,result) => {
                    if(err) {
                        return res.status(400).send("Error in deleting contact");
                    } 
                    console.log(result,"result");
                    res.status(200).send(result.contacts);
                })
            }
        
        });
       
    })
})

// mongoose.model('comment').find({}, function(err,docs){
//     if(err) return next(err);
//     docs.forEach(function(doc, index){

//       for(var i =0; i < comments.length; i++ ) {
//         if(comments[i].commentType == 'image')
//           doc.comments.remove(comments[i]._id.toString());
//       }

//       if(index < docs.length - 1) doc.save();
//       else doc.save(next);
//     });
//   });
module.exports = router;