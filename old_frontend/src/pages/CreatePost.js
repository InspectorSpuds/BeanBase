import './CreatePost.css'
import Navbar from './NavBar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import RequestSender from '../api/RequestSender';
import React from "react";
import { useNavigate } from 'react-router-dom';
import LoadScreen from './LoadScreen';
import Cookies from 'universal-cookie';
import PostForm from './PostForm';


function CreatePost() {
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