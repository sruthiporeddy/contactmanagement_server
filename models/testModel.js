const mongoose = require('mongoose');
const validator = require('validator');
// const ObjectId = require('mongodb');

const Schema = mongoose.Schema;


const ContactSchema = new Schema({
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
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
    
    })
const UserSchema = new Schema({ 
   
        username : {
            type: String,
            required: true
            },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validator.isEmail
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    
});


exports.Contact = mongoose.model('Contact',ContactSchema);
exports.User = mongoose.model('User',UserSchema);
