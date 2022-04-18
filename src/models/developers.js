const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const developerSchema = new mongoose.Schema( {
    name: String,

    gender:{
              type:String,
              enum:["male","female","others"]
            },
    percentage:Number,
    batch:{
           type:ObjectId,
           ref:"batchcollection"
    }
}, { timestamps: true });

module.exports = mongoose.model('developercollection', developerSchema)




