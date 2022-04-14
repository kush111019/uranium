const mongoose = require('mongoose');



const AuthorSchema = new mongoose.Schema( {
    author_id: {type:Number,required:true}, 
    author_name: String,
    age:Number, 
    address:String 
}, { timestamps: true });

module.exports= mongoose.model('Author', AuthorSchema)

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
