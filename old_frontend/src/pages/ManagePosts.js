//Author: Ishan Parikh
//Purpose: page for quick and easy post management

import './ManagePosts.css'
import Navbar from './NavBar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import RequestSender from '../api/RequestSender';
import React from "react";
import { useNavigate } from 'react-router-dom';
import LoadScreen from './LoadScreen';
import Cookies from 'universal-cookie';
import PostCard from './PostCard';

class PostObject {
  constructor(title, date, filler, id) {
    this.id = id;
    this.date = date;
    this.filler = filler;
    this.title = title;
  }
}

function ManagePosts() {
  //the validity or existence of the login token
  const [tokenValid, setTokenValidity] = useState(false);
  const [UID, setUserID] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  //removes the selected post by using the build in filter function to get all arr elements except
  //the selected post with given id
  const filterPostByID = (id) => setPosts(prev => prev.filter(item => item.id !== id));

  //preconditions: id and title of accompanying post must exist and be correct
  const removePost = (id, title) => {
    const req = new RequestSender();
    let deletedPost = null;
    
    //confirm deletion
    const confirmed = window.confirm(`Are you sure you want to delete the post called: \"${title}\" ?`)
    if(!confirmed) {
      return;
    } 
    
    //optimistic delete and then add back later
    
    console.log(id)
    //attempt to delete from db
    req.removePost(id)
      .then(resolve => { //alert user on success
        filterPostByID(id);
        alert("Post successfully deleted")
      })
      .catch(err => { //rollback post deletion and alert user on fail
        alert("Error on delete: " + err.message)
      })
    
  }

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
      return;
    } 

    //validate the user token and redirect back to home page on fail
    reqSender.validateUserToken(token)
        .then(response => {
          //get user information
          setTokenValidity(true);
          setUserID(old => response.data[0].id)
        })
        .catch(error => {alert(error.message); navigate('/')})

    //get all the posts and then arrange them as cards
    reqSender.getPostsWithUserID(UID)
        .then(resolve => {
          //refresh posts hook and then populate it
          for(let index = 0; index < resolve.data.length; index++) {
            let currentPost = resolve.data[index]
            console.log(resolve)
            setPosts(old => [...old, new PostObject(currentPost.Title, 
                                    currentPost.CreationDate, 
                                    String(currentPost.Content).substring(0,Math.min(String(currentPost.Content).length, 200)), 
                                    currentPost.PID)])
          }
        })
  },[])

  if(!tokenValid) return (<LoadScreen ></LoadScreen>);
  else
    return (
      <div>
        <Navbar/>
        <div id={"greeter"}>
          <h1>Select posts to delete</h1>
        </div>
        <div className={"Main"}>
          <div className={"PostDeletionLists"}>
            {posts.map( postobj => {
              console.log(postobj)
              return <PostCard date={postobj.date} title={postobj.title}  id={postobj.id} 
                               deletable={true} deleteFunction={removePost}/>
            })}

          </div>
          <Footer/>
        </div>
      </div>
    )
}

export default ManagePosts;