const express = require("express")
const router = express.Router()

//check the info is valid

//Preconditions: all post details MUST be provided
router.post("/create", async (req, res) => {
  try {
    let result = await global.dbHelper.createEntirePost(req.body.Coffee, req.body.Post, req.body.TasteProfile, req.body.UID);
    res.status(200)
    res.json("successfully posted")
  } catch(error) {
    console.log(error.message);
    res.status(404)
    res.json({message: error.message})
  }
})

//router.post("/update", async (req, res) => {
//  try {
//    console.log(req.body.Post)
//    //let result = await global.dbHelper.createEntirePost(req.body.Coffee, req.body.Post, req.body.TasteProfile, req.body.UID);
//    res.status(200)
//    res.json("successfully posted")
//  } catch(error) {
//    console.log(error.message);
//    res.status(404)
//    res.json({message: error.message})
//  }
//})


//Precondition: pid must be a value and not undefined, NaN, etc. 
//get full post details for a single post
router.get("/get/:PID", async (req, res) => {
  if(req.params.PID === undefined) {
    res.status(404)
    res.json({message: "no post id passed"})
  } else reqWrapper( async () => global.dbHelper.getPost(req.params.PID),res);
})

//Preconditions: pid must be a valid value for a post
router.delete("/remove/:PID", async (req, res) => {
  if(req.params.PID === undefined) {
    console.log(req.params.PID);
    res.status(404)
    res.json({message: "no post id passed"})
  } else reqWrapper( async () => global.dbHelper.deletePost(req.params.PID), res);
})


//Preconditions: none
//Process: get partial post details for all posts (to create Post cards in react) 
router.get("/getAll", async (req, res) => {
  reqWrapper(async () => global.dbHelper.getPosts(), res);
})

router.get("/getAll/:PID", async (req, res) => {
  if(req.params.PID === undefined) {
    res.status(404)
    res.json({message: "no post id passed"})
  } else reqWrapper( async () => global.dbHelper.getUserPosts(req.params.PID),res); 
})

async function reqWrapper(command, res,  errorResponse={status:404, message: "Resource not found"}){
  try{
    //wait for sql query to resolve and return
    const dbResult = await command()
    res.json(dbResult)
  } catch(error) { //catch any sort of errors
    console.log(error.message)
    res.status(404)
    res.json(error.message)
  }
}

module.exports = router;