
const AuthorModel= require("../Models/authorModel")


const createAuthor= async function (req, res) {
    let data= req.body
    let savedData=null;
    if(data.author_id)
    {
        savedData= await AuthorModel.create(data)
    }
    res.send({msg:savedData})

    
}

 

module.exports.createAuthor=createAuthor;


