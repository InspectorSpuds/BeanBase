//@Filename: index.js
//@author: Ishan Parikh
//@Purpoes: routes and handling for expressjs backend
const express = require("express");
const {DBHandler} = require('./dbhandler.js')
require('dotenv').config();

//routes
const Posts = require('./routes/Posts.js')



const app = express()
const PORT = 4000


//create db connection object and try to connect first and see if that works
global.dbHelper = new DBHandler(process.env.ORIGIN, process.env.USER, process.env.PASSWORD)

//to use data in body 
app.use(express.json({
  type: "*/*"
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/Posts", Posts)

app.listen(PORT, () => {
  //try to init db, on fail exit program
  try {
    dbHelper.initDB();
  } catch (DBInitError) {
    console.log("Error in db creation, exiting program");
    process.exit();
  }

  console.log(`CoffeeBlog REST backend: http://localhost:${PORT}`)
})


//routes--------
app.get('/getBooks', async (req, res) => {
  try{
    //wait for sql query to resolve and return
    const dbResult = await dbHelper.getBooks()
    res.json(dbResult)
  } catch(error) { //catch any sort of errors
    res.status(404)
    res.json({message: error.message})
  }

})
