const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController.js")

router.post("/createUser", UserController.createUser)

router.get("/getUsersData", UserController.getUsersData)
router.get("/test-me",function(req,res){
res.send({obj:"i am here!"});

});

module.exports = router;