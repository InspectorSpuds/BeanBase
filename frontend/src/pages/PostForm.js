import './CreatePost.css'
import { useEffect, useState } from 'react';
import RequestSender from '../api/RequestSender';
import React from "react";
import { useNavigate } from 'react-router-dom';
const uuid = require('uuid')

//OPTIONAL DEPENDENCIES:
// --PREV_PID: previous post PID if in update mode (must be correct obviously)
function PostForm(props) {
  //Optional previous post id to alter
  const PREV_PID = props.PID;
  const UPDATE_POST = PREV_PID!==null&&PREV_PID!==undefined;
  //form fields to submit
  const [content, setContent]     = useState("")
  const [tasteList, setTaste]     = useState({'Finish': 0,'Sweet': 0,'Acidic': 0,'Floral':0,'Spicy':0,'Salty':0,'Berry':0,'Citrus':0,'Stonefruit':0,'Chocolate': 0,'Caramel':0,'Smoky':0,'Bitter':0,'Savory':0,'Body':0,'Clean':0})
  const [CID, setCID]             = useState("")
  const [roaster, setRoaster]     = useState("")
  const [origin, setOrigin]       = useState("")
  const [coffeeName, setName]     = useState("")
  const [postTitle, setPostTitle] = useState("Review")
  const navigate                  = useNavigate();

  //post submission action
  const createPost = (e) => {
    e.preventDefault();
    
    //information needed for a post, pretty self-explan
    const TasteProfile = tasteList;
    const Coffee = {
      CID :(UPDATE_POST ? CID :  uuid.v4().toString().slice(0,10)), 
      Roaster: roaster,
      OriginCountry: origin,
      CoffeeName: coffeeName
    }
    const Post = {
      PID: (UPDATE_POST ? PREV_PID : uuid.v4().toString().slice(0,10)), 
      Title: postTitle,
      CreationDate: new Date().toJSON().slice(0, 10),
      Content: content.replaceAll('\'', '\\\'').replaceAll('\"', '\\\"') //replace mysql special characters
    }
    const UID = props.id;
    const reqSender = new RequestSender();
    
    //if in update mode use the update funtion, else use the create function
    if(UPDATE_POST) {
        //start update call
    } else {
      //send a request to create the post and handle any issues that may pop up
      reqSender.createPost(Coffee, Post, TasteProfile, UID)
      .then(resolve=> {
        alert('post successfully created')
        navigate('/')
      })
      .catch(error => alert(`Error: ${error.message}`))
    }

  }

  //changes the taste profile object's field for designated key
  const setTasteField = (key, newValue) => {
    let tasteClone = JSON.parse(JSON.stringify(tasteList))

    tasteClone[key] = newValue;
    console.log(tasteClone);
    setTaste(old => JSON.parse(JSON.stringify(tasteClone)));
  }




  useEffect(() => {
    //skip fetching old post if no PID passed
    if(PREV_PID === undefined || PREV_PID === null) return;

    const req = new RequestSender();

    //get all the old post parameters
    req.getPost_withID(PREV_PID)
      .then(resolve => {
        //set all parameters
        setContent((resolve.data[0].Content.replace('\\\'','\'').replace('\\\"','\"'))) //replace special characters and new line characters
        setTaste([
          {
            subject: "Finish",
            A: parseInt(resolve.data[0].Finish),
            fullMark: 10
          },
          {
            subject: "Sweet",
            A: parseInt(resolve.data[0].Sweet),
            fullMark: 10
          },
          {
            subject: "Acidic",
            A: parseInt(resolve.data[0].Acidic),
            fullMark: 10
          },
          {
            subject: "Spicy",
            A: parseInt(resolve.data[0].Spicy),
            fullMark: 10
          },
          {
            subject: "Salty",
            A: parseInt(resolve.data[0].Salty),
            fullMark: 10
          },
          {
            subject: "Berry",
            A: parseInt(resolve.data[0].Berry),
            fullMark: 10
          },
          {
            subject: "Citrus",
            A: parseInt(resolve.data[0].Citrus),
            fullMark: 10
          },
          {
            subject: "Stonefruit",
            A: parseInt(resolve.data[0].Stonefruit),
            fullMark: 10
          },
          {
            subject: "Chocolate",
            A: parseInt(resolve.data[0].Chocolate),
            fullMark: 10
          },
          {
            subject: "Caramel",
            A: parseInt(resolve.data[0].Caramel),
            fullMark: 10
          },
          {
            subject: "Smoky",
            A: parseInt(resolve.data[0].Smoky),
            fullMark: 10
          },
          {
            subject: "Bitter",
            A: parseInt(resolve.data[0].Bitter),
            fullMark: 10
          },
          {
            subject: "Savory",
            A: parseInt(resolve.data[0].Savory),
            fullMark: 10
          },
          {
            subject: "Body",
            A: parseInt(resolve.data[0].Body),
            fullMark: 10
          },
          {
            subject: "Clean",
            A: parseInt(resolve.data[0].Clean),
            fullMark: 10
          },
        ])
        setRoaster(resolve.data[0].Roaster)
        setOrigin(resolve.data[0].OriginCountry)
        setCID(resolve.data[0].CID)
        setName(resolve.data[0].Name)
        setPostTitle(resolve.data[0].Title)
      })
      .catch(err => {
        alert("error getting old post: " + err.message)
      })

    //update the 

  }, [])

  return (
    <div>
      <form className={"postForm"}  onSubmit={e => createPost(e)}>
        <div className={"formDivider"}>
          <div className={"PostFields"}>
            <h2>Post Details</h2>
              <div className={"PostRow"}>
                <label>Title: </label>
                <input type={"text"} value={postTitle} onChange={e => setPostTitle(old => e.target.value)} />
              </div>
              <div className="PostRow">
                <label>Content:</label>
                <br></br>
                <textarea value={content} onChange={e => setContent(e.target.value)}/>
              </div>              
          </div>
          <div className={"PostFields"}>
            <h2>Taste Profile: </h2>
            {
              Object.entries(tasteList).map(([key, value]) => {
                const uniKey = key;
                return (
                  <div className="PostRow" key={uniKey}>
                    <label>{key}</label>
                    <input type={"number"} value={tasteList[key]} onChange={e => setTasteField(uniKey, e.target.value)}/>
                  </div>
                )
              })
            }
          </div>
          <div class={"PostFields"}>
            <h2>Coffee Details: </h2>
            <div className='PostRow'>
              <label>Name: </label>
              <input type={"text"} value={coffeeName} onChange={e => setName(old => e.target.value)} />
            </div>
            <div className='PostRow'>
              <label>Roaster: </label>
              <input type={"text"} value={roaster}    onChange={e => setRoaster(old => e.target.value)} />
            </div>
            <div className='PostRow'>
              <label>Origin: </label>
              <input type={"text"} value={origin}     onChange={e => setOrigin(old => e.target.value)} />
            </div>
          </div>
        </div>
        <div className={"Actions"}>
          <input type="submit" value={"Create Post"} />
        </div>
      </form>
    </div>
  )  
}

export default PostForm;