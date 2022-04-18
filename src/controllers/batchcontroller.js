const batchModel=require("../models/batch.js")
const mongodb=require("mongodb")
const developerModel=require("../models/developers.js")

const addBatch=async function(req,res){
let batch=req.body;
let ack=await batchModel.create(batch)
res.send(ack)
}

module.exports.addBatch=addBatch;