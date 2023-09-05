import './CreatePost.css'
import Navbar from './Navbar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import RequestSender from '../api/RequestSender';
import React from "react";
import { useNavigate } from 'react-router-dom';
import LoadScreen from './LoadScreen';
import Cookies from 'universal-cookie';
const uuid = require('uuid')


function PostForm(props) {
  //post submission action
  const createPost = (e) => {
    e.preventDefault();
    
    //information needed for a post, pretty self-explan
    console.log(uuid.v4().toString().slice(0,10));
    const TasteProfile = tasteList;
    const Coffee = {
      CID : uuid.v4().toString().slice(0,10), 
      Roaster: roaster,
      OriginCountry: origin,
      CoffeeName: coffeeName
    }
    const Post = {
      PID: uuid.v4().toString().slice(0,10), 
      Title: postTitle,
      CreationDate: new Date().toJSON().slice(0, 10),
      Content: content.replaceAll('\'', '\\\'').replaceAll('\"', '\\\"') //replace mysql special characters
    }
    const UID = props.id;
    const reqSender = new RequestSender();
    
    //send a request to create the post and handle any issues that may pop up
    reqSender.createPost(Coffee, Post, TasteProfile, UID)
      .then(response => {
        alert('post successfully created')
        navigate('/')
      })
      .catch(error => alert(`Error: ${error.message}`))
  }

  //changes the taste profile object's field for designated key
  const setTasteField = (key, newValue) => {
    let tasteClone = JSON.parse(JSON.stringify(tasteList))

    tasteClone[key] = newValue;
    console.log(tasteClone);
    setTaste(old => JSON.parse(JSON.stringify(tasteClone)));
  }

  //form fields to submit
  const [content, setContent]     = useState("")
  const [tasteList, setTaste]     = useState({'Finish': 0,'Sweet': 0,'Acidic': 0,'Floral':0,'Spicy':0,'Salty':0,'Berry':0,'Citrus':0,'Stonefruit':0,'Chocolate': 0,'Caramel':0,'Smoky':0,'Bitter':0,'Savory':0,'Body':0,'Clean':0})
  const [currentTab, setCurrTab]  = useState("content");
  const [roaster, setRoaster]     = useState("none")
  const [origin, setOrigin]       = useState("none")
  const [coffeeName, setName]     = useState("none")
  const [postTitle, setPostTitle] = useState("Review")
  const navigate                  = useNavigate();

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
              <input type={"text"} onChange={e => setName(old => e.target.value)} />
            </div>
            <div className='PostRow'>
              <label>Roaster: </label>
              <input type={"text"} onChange={e => setRoaster(old => e.target.value)} />
            </div>
            <div className='PostRow'>
              <label>Origin: </label>
              <input type={"text"} onChange={e => setOrigin(old => e.target.value)} />
            </div>
          </div>
        </div>
        <div className={"Actions"}>
          <input type="submit" value={"Create Account"} />
        </div>
      </form>
    </div>
  )  
}

function CreatePost(props) {
  //the validity or existence of the login token
  const [tokenValid, setTokenValidity] = useState(false);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const navigate = useNavigate();

  //on start, populate the page with
  useEffect(() => {
    //try to check for token validity
    if(tokenValid) return;

    const reqSender = new RequestSender();
    const cookies = new Cookies();
    const token = cookies.get('session-token');

    //remove the token and redirect to home on invalid credentials
    if(token === undefined || token === null) {
      alert("Login info not present or invalid, redirecting to login");
      cookies.remove('session-token');
      navigate('/login');
    } else {
      //wait a bit (if there isn't a bit of delay, people assume nothing happens)
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
      delay(2000)
        .then(resolve => {
          //on successful validate, get the user id and name to store for creation
          //on failure, notify of error and redirect to home
      
          reqSender.validateUserToken(token)
          .then(response => {
            setTokenValidity(true);
            setUserName(response.data[0].Username)
            setUserID(old => response.data[0].id)
          })
          .catch(error => {
            alert(error.message);
            alert("Error logging in: please try again or logout and relogin later");
            navigate('/');
          })
        })
      }



    //then get the user information
  },[])

  if(!tokenValid) return (<LoadScreen ></LoadScreen>);
  else
    return (
      <div>
        <Navbar/>
        <div id={"greeter"}>
          <h1>Welcome {userName}! Let's create a post!</h1>
        </div>
        <div className={"Main"}>
          <PostForm id={userID}/>
          <Footer/>
        </div>
      </div>
    )
}

export default CreatePost;