const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;


const contactsSchema = new Schema({
    
    contactname: {
        type: String,
        required: true
        
    },
    address: {
        type: String,
    },
    phonenumber: {
        type: Number,
        maxlength:10
    }
    // contactID : {
    //     type: Number,
    //     required: true
    // }
});


// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//         validate: {
//            validator: validator.isEmail
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     // contacts: [{
//     //     type:Schema.Types.ObjectId,
//     //     ref: 'Contact'
//     // }]
//     contacts: [contactsSchema]
// });




const ManagementSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
           validator: validator.isEmail
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
   
    contacts: [contactsSchema],
    username: {
        type: String,
    },
    lastname: {
        type: String,
    },
    roleType: {
        type :String
    },
   
})

 //exports.Contact = mongoose.model('Contact', contactsSchema);
 //exports.User = mongoose.model('User', userSchema);
 exports.Management  = mongoose.model('Management', ManagementSchema);

