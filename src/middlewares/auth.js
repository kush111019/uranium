const middle=require("../middlewares/auth")
const express = require('express')
const jwt = require("jsonwebtoken");
const app = express()

const mid44= function ( req, res, next) {
    try{
    
    let userToGet=req.params.userId;
    let token = req.headers["x-Auth-token"];
   if (!token) token = req.headers["x-auth-token"];
   let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.status(401).send({ status: false, msg: "token is invalid" });
    let userLoggegIn=decodedToken.userId;
   if(userToGet!=userLoggegIn)
   return res.status(403).send({msg:"unauthorised user"})
    }catch{

      console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
    }


}
const mid45=function(req,res,next){
  try{
    let userToBeModified=req.params.userId;
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-thorium");
   if (!decodedToken)
     return res.status(401).send({ status: false, msg: "token is invalid" });
   let userLoggegIn=decodedToken.userId;
   if(userToBeModified!=userLoggegIn)
   return res.status(403).send({msg:"unauthorised user"})
  }catch{

    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
  }

  const mid46=function(req,res,next){
    try{
    
    let userToBeDeleted=req.params.userId;
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-thorium");
   if (!decodedToken)
     return res.status(401).send({ status: false, msg: "token is invalid" });
   let userLoggegIn=decodedToken.userId;
   if(userToBeDeleted!=userLoggegIn)
   return res.status(403).send({msg:"unauthorised user"})
    }catch{

      console.log("This is the error :", err.message)
      res.status(500).send({ msg: "Error", error: err.message })
    }

  }
module.exports.mid44= mid44
module.exports.mid45= mid45
module.exports.mid46= mid46
