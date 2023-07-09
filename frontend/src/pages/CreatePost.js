import './Home.css'
import Navbar from './Navbar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import RequestSender from '../api/RequestSender';
import React from "react";
import { useNavigate } from 'react-router-dom';
import LoadScreen from './LoadScreen';


function CreatePost() {
  //the validity or existence of the login token
  const [tokenValid, setTokenValidity] = useState(false);
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
      alert("Login token invalid, redirecting to home");
      cookies.remove('session-token');
      navigate('/');
    }

    //on successful validate, get the user id and name to store for creation
    //on failure, notify of error and redirect to home
    reqSender.validateUserToken(token)
      .then(response => {
        setTokenValidity(prev => true);
      })
      .catch(error => {
        alert("Error logging in: please try again or logout and relogin later");
        navigate('/');
      })

  },[])

  if(!tokenValid) return (<LoadScreen ></LoadScreen>);

  return (
    <div>
      <Navbar/>
      <h1 id={"greeter"}>Welcome!</h1>
      <h2>Posts</h2>
      <div className={"Main"}>
        {postList.map( postobj => {
          return <PostCard date={postobj.date} title={postobj.title} filler={postobj.filler} id={postobj.id} />
        })}
        <Footer/>
      </div>
    </div>
  )
}

export default CreatePost;