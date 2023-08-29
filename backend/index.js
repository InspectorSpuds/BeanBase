//@Filename: index.js
//@author: Ishan Parikh
//@Purpoes: routes and handling for expressjs backend
const express = require("express");
const {DBHandler} = require('./lib/db')
require('dotenv').config({path: "./.env"});

const app = express()
const PORT =  process.env.port || 4000

//routes
const Posts = require('./routes/Posts.js')
const User = require('./routes/User.js')


//create db connection object and try to connect first and see if that works
global.dbHelper = new DBHandler(process.env.HOST, process.env.ADMIN, process.env.PASSWORD, parseInt(process.env.PORT), process.env.SSL)
global.secret = process.env.ACCESS_TOKEN_SECRET;

app.listen(PORT, () => {
  //try to init db, on fail exit program
  try {
    dbHelper.initDB();
  } catch (DBInitError) {
    console.log(DBInitError.message);
    process.exit();
  }

  console.log(`CoffeeBlog REST backend: http://localhost:${PORT}`)
})

//to use data in body 
app.use(express.json({
  type: "*/*"
}))

//for local testing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//routes--------
app.use("/Posts", Posts)
app.use("/User", User)