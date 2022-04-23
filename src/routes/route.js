const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middle=require("../middlewares/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)


//The userId is sent by front end
router.get("/users/:userId",middle.mid44, userController.getUserData)
router.post("/users/:userId/posts",middle.mid46,userController.postMessage)
router.put("/users/:userId",middle.mid45,userController.updateUser)
router.delete("/users/:userId",middle.mid46,userController.deleteMe)
module.exports = router;