
const BookModel= require("../Models/bookModel")
const AuthorModel=require("../Models/authorModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData=null;
    if(data.author_id)
    {
        savedData= await BookModel.create(data)
    }
    res.send({msg:savedData})

}


/*const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find( {authorNa
    if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    else res.send({msg: "No books found" , condition: false})
}*/


const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}me : "HO" } )
    console.log(allBooks)
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}
const getBooksByName=async function(req,res){

    const auth=req.body; 
    let author= await AuthorModel.findOne(auth)
    let allBooks= await BookModel.find({author_id:author.author_id})
    console.log(allBooks)
    res.send({msg: allBooks, condition: true})
 }

 const getBook=async function(req,res){
    let bName=req.body;
  let book1=await BookModel.findOneAndUpdate(
      bName,
     {$set:{price:100}},
     {new:true,upsert:true}
     )
   let id=book1.author_id;
   let bb=await AuthorModel.find({author_id:id})
   let name= bb[0].author_name;
   let uprice= book1.price;
   res.send({msg:name,uprice})
    
    }
/*const brange=async function(req,res){
  
    const booksid=await BookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0})
    const id=booksid.map(inp=>inp.author_id)
    const allAuthorNames= id.map(x => {return authorModel.find({author_id:x}).select({author_name:1, _id:0})
    res.send({msg:allAuthorNames})
    let temp =[]
    for(let i=0; i<id.length; i++) {
        let x = id[i]
        const author = await AuthorModel.find({author_id:x}).select({author_name:1, _id:0})
        temp.push(author)

        const authorName = temp.flat()

        res.send({msg:authorName})
      }
      
    }
 
  }*/

// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
//module.exports.getBooksData= getBooksData
//module.exports.updateBooks= updateBooks
//module.exports.deleteBooks= deleteBooks
module.exports.getBook=getBook;
//module.exports.brange=brange;

