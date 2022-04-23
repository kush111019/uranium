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
  }catch{
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
  res.status(401).send({ status: true, data: token });
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
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteMe=deleteMe


// / 2xx- Success // 4xx- something gone wrong..and problem is on user side(client side) // 5xx- server side problems

// // "BAD REQUEST" ...400..say if username password dont match etc..or anything generic( any problem in input on user side or any other unhandled problem) // "RESOURCE NOT FOUND"...404 //404 page not found...eg. find ("asaijndianud89")...let book =bookModel.findOne({_id:"asaijndianud89"}) if (book){..} else res.status(404).send({}) // "AUTHENTICATION MISSING"...401..login is required...if(token){...} else { res.status(401)} // "NOT AUTHENTICATED OR FORBIDDEN"..403 // if ( token.userId === userId) {...} else {res.status(403).send({}) } // -- try catch ....// "SERVER ERROR"...500

// // -- ALL GOOD... //status(200)- OK // --- "ALL GOOD and A NEW RESOURCE WAS SUCCEFULLY CREATED" ...status(201)..e.g a new user registers herself successfully
// const createBook = async function (req, res) {
//   try {
//       let data = req.body
//       console.log(data)
//       if ( Object.keys(data).length != 0) {
//           let savedData = await BookModel.create(data)
//           res.status(201).send({ msg: savedData })
//       }
//       else res.status(400).send({ msg: "BAD REQUEST"})
//   }
//   catch (err) {
//       console.log("This is the error :", err.message)
//       res.status(500).send({ msg: "Error", error: err.message })
//   }
// }