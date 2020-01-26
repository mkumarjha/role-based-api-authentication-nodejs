const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

// Admin schema
const AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        index:true,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    job_profile:{
        type:String,
        required:true
    }

});

AdminSchema.plugin(uniqueValidator);
const Admin = module.exports = mongoose.model('Admin',AdminSchema);

// Find the Admin by id
module.exports.getAdminById = function(id,callback){
    Admin.findById(id,callback);
}

module.exports.getAdminByUsername = function(username,callback){
    const query = {
        username:username
    }
    Admin.findOne(query,callback);
}

// To register the Admin
module.exports.addAdmin = function(newAdmin,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newAdmin.password,salt,(err,hash)=>{
            if(err) return err;
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

// Compare password
module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}