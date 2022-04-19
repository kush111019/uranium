const batchModel=require("../models/batch.js")
const mongodb=require("mongodb")
const developerModel=require("../models/developers.js")
const ObjectId = require('mongoose').Types.ObjectId;


const createDeveloper=async function(req,res){

   developer=req.body
   dev=await developerModel.create(developer)
   res.send(dev)
}

const elegibleDevelopers=async function(req,res){

deve=await developerModel.find({ $and: [ {gender:"female" },{ percentage: { $gt: 85} }] })
res.send(deve)
}

const selectedProgram=async function(req,res){

let per1=req.query.percentage;
let per2=req.query.program;
let person1=[];
let person=await batchModel.find({name:per2})
for(let i=0;i<person.length;i++)
{
    person1[i]=person[i]._id
}
 let deve= await developerModel.find({$and:[{percentage:{$gte:per1}},{batch:{$in:person1}}]})

console.log(deve)


}
// await developerModel.find({ $and: [ {program:"backend"},{ percentage: { $gt: percentage} }] }).populate('batch_id')
//     //let specificdeveloper = await developerModel.find({percentage: { $gt: percentage} }).populate('batch_id')
    


module.exports.createDeveloper=createDeveloper;
module.exports.elegibleDevelopers=elegibleDevelopers
module.exports.selectedProgram=selectedProgram
