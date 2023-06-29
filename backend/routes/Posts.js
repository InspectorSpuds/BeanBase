const express = require("express")
const router = express.Router()

//check the info is valid

//Preconditions: all post details MUST be provided
router.post("/create", async (req, res) => {
})

//Precondition: pid must be a value and not undefined, NaN, etc. 
//get full post details for a single post
router.get("/get", async (req, res) => {
  if(req.body.PID === undefined || isNaN(req.body.PID)) {
    res.status("404")
    res.json({message: "no post id passed"})
  } else reqWrapper(global.dbHelper.getPost(req.body.PID));
})

//Preconditions: none
//Process: get partial post details for all posts (to create Post cards in react) 
router.get("/getAll", async (req, res) => {
  reqWrapper(global.dbHelper.deletePost(), {status: 404, message: "Posts not found"});
})

//careful with this one, make sure necessary security measures are taken
//router.delete("/del", async (req, res) => {
//  if(req.body.PID === undefined || isNaN(req.body.PID)) {
//    res.status("404")
//    res.json({message: "no post id passed"})
//  } else reqWrapper(global.dbHelper.deletePost(), {status: 404, message: "Post not found"});
//})

async function reqWrapper(command, errorResponse={status:404, message: "Resource not found"}){
  try{
    //wait for sql query to resolve and return
    const dbResult = await command()
    res.json(dbResult)
  } catch(error) { //catch any sort of errors
    res.status(errorResponse.status)
    res.json({message: errorResponse.message})
  }
}

module.exports = router;