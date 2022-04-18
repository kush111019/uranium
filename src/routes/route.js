const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController=require("../controllers/publisherController")
const AuthorModel=require("../models/newAuthor")
const BookModel=require("../models/newBook")
const PublisherModel=require("../models/newPublisher")
const batchModel=require("../models/batch")
const batchController=require("../controllers/batchcontroller")
const developerController=require("../controllers/developercontroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/createBatch",batchController.addBatch)
router.post("/createDeveloper",developerController.createDeveloper)
router.get("/elegibleDeveloper",developerController.elegibleDevelopers)
router.get("/developers",developerController.selectedProgram)
// router.post("/createAuthor", authorcontroller.createAuthor  )
// router.get("/getByRating",bookController.upByPrice);
// router.post("/createPublisher",publisherController.createPublisher)
// router.post('/createBook',bookController.createBook)
// router.get("/getBook",bookController.getBooksWithDetails)
// router.put("/updateBook",bookController.updBook)
// router.get("/upbyauth",bookController.updateByAuthor)

//router.get("/getAuthorsData", authorController.getAuthorsData)

//router.post("/createBook", bookController.createBook  )

//router.get("/getBooksData", bookController.getBooksData)

//router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;