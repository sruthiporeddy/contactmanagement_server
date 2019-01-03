const jwt = require('jsonwebtoken');
const UserModel = require('../models/testModel');
const User = UserModel.User;
const Contact = UserModel.Contact;



exports.registerUser = (req,res) => {
   // console.log(req.body);
    
    const user = new User(req.body);
    user.save((error,response) => {
       //  console.log(response);
        if(error) {
            return res.status(400).send(error);
        }
        res.status(200).send(response);
    })
}

exports.loginUser = (req,res) => {
    const loginUser = {
        email: req.body.email,
        password: req.body.password
    }
    User.find({email:loginUser.email},(err,loggedInUser) =>{
       // console.log(loggedInUser[0]._id);
        if(err) {
            res.status(500).send(err);
        } else {
            if(!loggedInUser) {
                return res.status(404).send(err);
            } else if(loggedInUser[0].password !== loginUser.password) {
                return res.status(401).send(err);
            }
            let payload = { subject:loggedInUser[0]._id };
            // console.log('payload',payload);
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
        }
        
    })
}


exports.createContact = (req,res) => {
    let id = req._id;
    // console.log(id);
    const contact = new Contact({
      contactname: req.body.contactname,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      createdBy: id
  });
  // console.log(contact);
  contact.save(function(err,createdcontact) {
      if(err) {
          return res.status(401).send(err);
      }
      res.status(200).send(createdcontact);
  })
    
}

exports.getContact = (req,res) => {
    let id = req._id;
    Contact.find({createdBy:id},(err,contacts) => {
       if(err) {
           return res.status(500).status('Error in finding contacts');
       } else {
           if(!contacts) {
               return res.status(404).status('No Contacts found');
           }
           res.status(200).send(contacts);
       }
    })
}
exports.deleteContact = (req,res) => {
    let name = req.params.name;

    Contact.findOne({contactname:name}).then((user) => {
       // console.log(user);
       user.remove().then((result) => {
          
           if(!result) {
               return res.status(404).send('No contact found');
           }
            res.json(result);
        // res.status(200).send();
       }).catch((err) => {
           res.status(500).send('Error in deleting contact');
       })
    })
}


// exports.deleteContact = (req,res) => {
//     let name = req.params.name;
//     let contact = Contact;
//     contact.remove(function (err, product) {
//         if (err) return handleError(err);
//         Contact.findOne({contactname:name}, function (err, deletecontact) {
//           res.status(200).send(deletecontact) // null
//         })
//       })
    
// }

// exports.getusers = (req,res) => {
//     User.find({})
// }