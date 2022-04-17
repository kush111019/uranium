const authorModel = require("../models/newAuthor")
const PublisherModel=require("../models/newPublisher")
const bookModel= require("../models/newBook")
const ObjectId = require('mongoose').Types.ObjectId;
const mongodb=require("mongodb")


 const createBook= async function (req, res) {

        let newbook=req.body;
        
        if(!newbook.author){
            return res.send({Error:"Please enter Athor ID"})
        }
        if(!newbook.publisher){
            return res.send({Error:"Please enter Publisher ID"})
        }
       
       let auth= await authorModel.find();
          let validAuth=auth.find(value=>{
              return value._id==newbook.author
          })
        
          if(!validAuth){
            return res.send({Error:"Please enter Valid Athor ID"})
          }  
    
          let publis=await PublisherModel.find();
          let validPublis=publis.find(value=>{
            return value._id==newbook.publisher
        })
      
        if(!validPublis){
          return res.send({Error:"Please enter Valid Publisher ID"})
        }  
             
    
      let bookData=await bookModel.create(newbook)
       res.send({data: bookData})
    }
    
        


const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}


const getBooksWithDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author')
    res.send({data: specificBook})

}

const updBook=async function (req,res){

let pubid=await PublisherModel.find({$or:[{name:"penguin"},{name:"Harper Collins"}]})
let j=0;
let m=0;
for(let i=0;i<pubid.length;i++)
{
 
 if(pubid[i].name=="penguin")
 break;
 j++;

}
for(let i=0;i<pubid.length;i++)
{

if(pubid[i].name=="Harper Collins")
break;
m++;

}
penguinId=pubid[j].name
harperId=pubid[m].name
console.log(penguinId)
console.log(harperId)

  let books1=await bookModel.updateMany(

  {name:penguinId},
 {$set:{isHardCover:true}},
  {new:true,upsert:true}
  )
   let books2=await bookModel.updateMany(

  {name:harperId},
  {$set:{isHardCover:true}},
  {new:true,upsert:true}
  )

   }

 const updateByAuthor=async function(req,res){


//   let books=await bookModel.find({rating:{$gt:3.5}})
//  for(let i=0;i<books.length;i++)
//  {
//   books[i].price=books[i].price+10;

//  }
// for(let i=0;i<books.length;i++)
// {
   
//   books[i].new=books[i].new=true;

// }
// for(let i=0;i<books.length;i++)
// {

//   books[i].upsert=books[i].upsert=true;

// }
//  res.send(books)
//console.log(value)
// let books=await bookModel.updateMany(


// {ratings:{$gt:3.5}},
// {$set:{}},
// {new:true,upsert:true}


// ) 
// console.log(books)
  }

module.exports.createBook= createBook
//module.exports.getBooksData= getBooksData
module.exports.getBooksWithDetails = getBooksWithDetails
module.exports.updBook=updBook;
module.exports.updateByAuthor=updateByAuthor;