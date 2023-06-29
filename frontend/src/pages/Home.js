import './Home.css'
import Navbar from './Navbar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import RequestSender from '../api/RequestSender';

class PostObject {
  constructor(title, date, filler, id) {
    this.id = id;
    this.date = date;
    this.filler = filler;
    this.title = title;
  }
}

function Home() {
  //list of post objects to render on page
  const [postList, setPosts] = useState([]);


  //on start, populate the page with
  useEffect(() => {
    //make request to backend for post list
    const sender = new RequestSender();

    //get info 
    sender.getAllPosts()
      .then(response => {
        //refresh posts hook and then populate it
        setPosts([])
        for(let index = 0; index < response.data.length; index++) {
          let currentPost = response.data[index]

          setPosts(old => [...old, new PostObject(currentPost.Title, 
                                                  currentPost.CreationDate, 
                                                  currentPost.Content.substring(0,Math.min(currentPost.Content.length, 200)), 
                                                  currentPost.PID)])
        }
      })
      .catch(error => alert("Error getting posts, please refresh page and try again"))

  },[])

  return (
    <div>
      <Navbar/>
      <div className={"Main"}>
        {postList.map( postobj => {
          return <PostCard date={postobj.date} title={postobj.title} filler={postobj.filler} id={postobj.id} />
        })}
        <Footer/>
      </div>
    </div>
  )
}

export default Home;