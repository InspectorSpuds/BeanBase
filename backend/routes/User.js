//Author: Ishan Parikh
//Date: 6-8-2023
//Purpose: User login related routes

const express = require("express")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const AuthValidator = require("../lib/AuthValidator")
const router = express.Router()
require('dotenv').config();


let refreshTokens = [];

//check if user already in db
  //raise error if already there

//else create user
  //error: raise error
router.post("/create", async (req, res) => {
  //the encrypted field strings
  let LOGIN_FIELDS_EXIST = req.body[NAME_FIELD] !== undefined 
                        && req.body[PASSWORD_FIELD] !== undefined

  const NAME_FIELD = encrypt("name")
  const PASSWORD_FIELD = encrypt("password")
  const ID_FIELD = encrypt("id")
  const HANDLER = new AuthValidator(process.env.TESTORIGIN, process.env.USER, process.env.PASSWORD);

  //Initialize authorizer, handling errors
  try {
    HANDLER.initDB();
  } catch(e) {
    res.status(404);
    res.send("Error connecting to server");
    return;
  }

  //decrypt the information received first
  let name = decrypt(req.body[NAME_FIELD]);
  let password = decrypt(req.body[PASSWORD_FIELD]);
  let id = (crypto.randomUUID()).substring(0, 10);

  //check for invalid login fields
  const PREV_LOGIN = await HANDLER.checkCredentials(name, password);
  if(!LOGIN_FIELDS_EXIST || PREV_LOGIN) {
    res.status(404);
    res.json({message: "Error: invalid fields or info"});
    return;
  }

  //try to actually create the user
  try {
    const result = HANDLER.insertCredentials(username, password)
  } catch(e) {
    res.status(404);
    res.json({message: "failed to insert credentials"})
  }

  res.status(200);
  res.send({message: "created"});
})

//check if user info correct
router.get("/validate", async (req, res) => {
  //the encrypted field strings
  const NAME_FIELD = encrypt("name")
  const PASSWORD_FIELD = encrypt("password");

  let LOGIN_FIELDS_EXIST = req.body[NAME_FIELD] !== undefined 
                        && req.body[PASSWORD_FIELD] !== undefined;

  const HANDLER = new AuthValidator(process.env.TESTORIGIN, process.env.USER, process.env.PASSWORD);
  let name = decrypt(req.body[NAME_FIELD]);
  let password = decrypt(req.body[PASSWORD_FIELD]);

  try {
    HANDLER.initDB();
  } catch(e) {
    res.status(404);
    res.send("Error connecting to server");
    return;
  }

  //token validate
  if(req.body.token !== undefined) {
    //to be added later
  
  //validate with login info and return a jwt token
  } else if(LOGIN_FIELDS_EXIST) {
    try {
      const PREV_LOGIN = await HANDLER.checkCredentials(name, password);

      //generate jwt tokeen and send
      const accessToken = jwt.sign(req.body.name, process.env.ACCESSTOKEN, {expiresIn: "90m"})
      const refreshToken = jwt.sign(req.body.name, process.env.ACCESSTOKEN, {expiresIn: "180m"});
      refreshToken.push(refreshToken);
      res.status(201)
      res.json ({accessToken: accessToken, refreshToken: refreshToken})
    } catch (e) {
      res.status(500);
      res.json({message: "Invalid credentials"})
    }
    
  } else  {
    //invalid fields
    res.status(404);
    res.json({message: "Error: invalid fields or info"});
  }
})


router.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
})

app.post("/refreshToken", (req,res) => {
  if (!refreshTokens.includes(req.body.token)) res.status(400).send("Refresh Token Invalid")
  refreshTokens = refreshTokens.filter( (c) => c != req.body.token)
  //remove the old refreshToken from the refreshTokens list
  const accessToken =  jwt.sign(req.body.name, process.env.ACCESSTOKEN, {expiresIn: "90m"})
  const refreshToken = jwt.sign(req.body.name, process.env.ACCESSTOKEN, {expiresIn: "180m"});
  //generate new accessToken and refreshTokens
  res.json ({accessToken: accessToken, refreshToken: refreshToken})
})

function validateToken(req, res, next) {
  //get token from request header
  const authHeader = req.headers["authorization"]
  const token = authHeader.split(" ")[1]
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  if (token == null) res.sendStatus(400).send("Token not present")
  jwt.verify(token, process.env.ACCESSTOKEN, (err, user) => {
    if (err) { 
      res.status(403).send("Token invalid")
    } else {
      res.status(200).send("valid")
    }
  }) //end of jwt.verify()
} //end of function


function encrypt(text) {
  const CYPHER = crypto.createCipheriv(process.env.ALGORITHM, process.env.KEY)
  return CYPHER.update(text, 'utf-8', 'hex') + CYPHER.final('hex');
}

function decrypt(text) {
  const DECYPHER = crypto.createDecipheriv(process.env.ALGORITHM, process.env.KEY)
  return DECYPHER.update(encrypted, 'hex', 'utf8') + DECYPHER.final('utf8');
}



module.exports = router;