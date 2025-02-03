const express = require("express");
const {postsignin,signinusers,getidsignup,editprofile,deleteprofile} = require("../controller/signincontroller");

const signinrouter = express.Router();

signinrouter.post("/", postsignin);
signinrouter.get("/allUsers", signinusers);
signinrouter.get("/:id", getidsignup);
signinrouter.put("/:id", editprofile);
signinrouter.delete("/:id", deleteprofile);






module.exports = signinrouter;
