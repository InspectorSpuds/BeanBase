const express = require("express")
const router = express.Router()

//check the info is valid

//Preconditions: all post details MUST be provided
router.post("/create", async (req, res) => {
  let PID = crypto.randomBytes(16).toString("hex").slice(0,10);
  let newPost = JSON.stringify()
  reqWrapper(async () => global.dbHelper.createPost(req.params.Coffee, req.params.Post, req.params.TasteProfile, req.params.UID), 
             res, {status: 404, message: "Unable to create post"})
})

//Precondition: pid must be a value and not undefined, NaN, etc. 
//get full post details for a single post
router.get("/get/:PID", async (req, res) => {
  if(req.params.PID == undefined) {
    res.status(404)
    res.json({message: "no post id passed"})
  } else reqWrapper( async () => global.dbHelper.getPost(req.params.PID),res);
})

//Preconditions: none
//Process: get partial post details for all posts (to create Post cards in react) 
router.get("/getAll", async (req, res) => {
  reqWrapper(async () => global.dbHelper.getPosts(), res, {status: 404, message: "Posts not found"});
})

//careful with this one, make sure necessary security measures are taken
/*router.delete("/del", async (req, res) => {
  if(req.body.PID === undefined || isNaN(req.body.PID)) {
    res.status("404")
    res.json({message: "no post id passed"})
  } else reqWrapper(global.dbHelper.deletePost(), {status: 404, message: "Post not found"});
})*/

async function reqWrapper(command, res,  errorResponse={status:404, message: "Resource not found"}){
  try{
    //wait for sql query to resolve and return
    const dbResult = await command()
    res.json(dbResult)
  } catch(error) { //catch any sort of errors
    res.status(404)
    res.json(error.message)
  }
}

module.exports = router;