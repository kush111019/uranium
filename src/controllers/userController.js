const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const middle1=require("../middlewares/auth")

const createUser = async function (abcd, xyz) {
  try{
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  console.log(abcd.newAtribute);
  xyz.status(201).send({ msg: savedData });
  }
  catch{
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })

  }
};

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;
   
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(400).send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FUnctionUp",
    },
    "functionup-thorium"
  );
  res.setHeader("x-auth-token", token);
  res.status(200).send({ status: true, data: token });
  }catch{

    console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
  }
};

const getUserData = async function (req, res) {
  try{
  // let token = req.headers["x-Auth-token"];
  // if (!token) token = req.headers["x-auth-token"];

  // //If no token is present in the request header return error
  // if (!token) return res.send({ status: false, msg: "token must be present" });

  // console.log(token);
  
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.status(401).send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(400).send({ status: false, msg: "No such user exists" });

  res.status(200).send({ status: true, data: userDetails });
  }catch{

    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
};

const updateUser = async function (req, res) {
  try{
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(400).send("No such user exists");
  }

  let userData = req.body;
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"];
if (!token) res.status(401).send({ status: false, msg: "token must be present" });
 token = jwt.sign(
  {
    userId: user._id.toString(),
    batch: "thorium",
    organisation: "FUnctionUp",
  },
  "functionup-thorium"
);
res.setHeader("x-auth-token", token);
let decodedToken = jwt.verify(token, "functionup-thorium");
if (!decodedToken)
  return res.status(401).send({ status: false, msg: "token is invalid" });


console.log(token);
  
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.status(200).send({ status: updatedUser, data: updatedUser });
}catch{

  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })

}
};
const deleteMe=async function(req,res){
try{
let userId=req.params.userId;
if(!userId)
return res.status(400).send({msg:"userId is required"})
let user=await userModel.findById(userId)
if(!user) return res.staus(404).send({msg:"user don't exists"})
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"];
if (!token) res.status(401).send({ status: false, msg: "token must be present" });
 token = jwt.sign(
  {
    userId: user._id.toString(),
    batch: "thorium",
    organisation: "FUnctionUp",
  },
  "functionup-thorium"
);
res.setHeader("x-auth-token", token);
let decodedToken = jwt.verify(token, "functionup-thorium");
if (!decodedToken)
  return res.status(401).send({ status: false, msg: "token is invalid" });

let upda=await userModel.findByIdAndUpdate(userId,{isDeleted:true},function(err,docs){

  if(err)
  {
    console.log(err)
  }
  else
  {
    res.status(200).send({upda})
  }
}).clone()
}catch{

  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}

}

const postMessage = async function (req, res) {
  try{
  let message = req.body.message
  console.log(req.body)
  console.log(message)
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  let token = req.headers["x-auth-token"]
  if(!token) return res.status(401).send({status: false, msg: "token must be present in the request header"})
  let decodedToken = jwt.verify(token, 'functionup-thorium')

  if(!decodedToken) return res.status(401).send({status: false, msg:"token is not valid"})
  
  //userId for which the request is made. In this case message to be posted.
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if(userToBeModified != userLoggedIn) return res.status(403).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

  let user = await userModel.findById(req.params.userId)
  if(!user) return res.status(400).send({status: false, msg: 'No such user exists'})
  
  let updatedPosts = user.posts
  //add the message to user's posts
  updatedPosts.push(message)
  let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

  //return the updated user document
  return res.status(201).send({status: true, data: updatedUser})
  }catch{
    console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })

  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteMe=deleteMe
module.exports.postMessage=postMessage;

