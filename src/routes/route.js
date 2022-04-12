const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
//const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController");
const bookModel = require('../models/bookModel');

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/particularBooks/:abcd",function(req,res){

   let b=req.params.abcd;
   let a= BookController.getParticularBooks(b);
   res.send({msg:a});
});

//router.get("/getXINR",BookController.getXINRBooks);

//router.post("/createUser", UserController.createUser  )

//router.get("/getUsersData", UserController.getUsersData)

//router.post("/createBook", BookController.createBook  )

//router.get("/getBooksData", BookController.getBooksData)
//router.get('/byBNameAName',BookController.getBookNameAuthorName)
//router.post('/byYear',BookController.getBooksByYear);
//router.post('/getRandomBooks',BookController.getRandomBooks);

module.exports = router;