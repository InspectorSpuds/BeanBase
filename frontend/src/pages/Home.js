import './Home.css'
import NavBar from './NavBar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import RequestSender from '../api/RequestSender';
import React from "react";

class PostObject {
  constructor(title, date, filler, id) {
    this.id = id;
    this.date = date;
    this.filler = filler;
    this.title = title;
  }
}

//note: good candidate for lambda function
//preconditions: id must either be a valid userID or null
function getAllPostCards(id=null) {
  //template class for post objects

  
  if(id === null) {
    return new Promise((resolve, reject) => {
      const sender = new RequestSender();

      sender.getAllPosts()
      .then(response => {
        //refresh posts hook and then populate it
        let postCards = []
        for(let index = 0; index < response.data.length; index++) {
          let currentPost = response.data[index]
          postCards.push(new PostObject(currentPost.Title, 
                                        currentPost.CreationDate, 
                                        currentPost.Content.substring(0,Math.min(currentPost.Content.length, 200)), 
                                        currentPost.PID))
        }
  
        resolve(postCards)
      })
      .catch(error => reject(error))
    })
  } else {
    //search for all posts with given user id (CALL LAMBDA FUNCTION)
  }
}

function Home() {
  //list of post objects to render on page
  const [postList, setPosts] = useState([]);

  //on start, populate the page with
  useEffect(() => {
    //make request to backend for post list
    getAllPostCards().then(resolve => {
      resolve.map(post => {
        setPosts(old => [...old, post])
      })
    }).catch(error => alert(error.message))
  },[])

  return (
    <>
      <NavBar></NavBar>
      <div className='MainContentArea'>
        <div id={"greeter"}>
          <h1>Finding irresistable coffee starts here!</h1>
        </div>
        <div className={"filter"}>
          <div>Posts</div>
        </div>
        <div className={"CardFlow"}>
            {postList.map( postobj => {
              return <PostCard date={postobj.date} title={postobj.title} filler={postobj.filler} id={postobj.id} deletable={false} />
            })}
        </div>
        <Footer/>
      </div>
    </>

   
  )
}

export const getPostCards =  getAllPostCards;
export default Home;