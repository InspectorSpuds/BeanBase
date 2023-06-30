import './PostViewer.css'
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
//import LoadScreen from './LoadScreen';
import RequestSender from '../api/RequestSender';
import RatingGraph from './RatingGraph';


function PostViewer() {
  const {id} = useParams();
  const [post, setPost] = useState("null");
  const [taste, setTaste] = useState([]);
  useEffect(() => {
    const getter = new RequestSender();

    //get the actual post itself
    getter.getPost_withID(id)
      .then(response => {
        setPost((response.data))
        setTaste([
          {
            subject: "Finish",
            A: parseInt(post[0].Finish),
            fullMark: 10
          },
          {
            subject: "Sweet",
            A: parseInt(post[0].Sweet),
            fullMark: 10
          },
          {
            subject: "Acidic",
            A: parseInt(post[0].Acidic),
            fullMark: 10
          },
          {
            subject: "Spicy",
            A: parseInt(post[0].Spicy),
            fullMark: 10
          },
          {
            subject: "Salty",
            A: parseInt(post[0].Salty),
            fullMark: 10
          },
          {
            subject: "Berry",
            A: parseInt(post[0].Berry),
            fullMark: 10
          },
          {
            subject: "Citrus",
            A: parseInt(post[0].Citrus),
            fullMark: 10
          },
          {
            subject: "Stonefruit",
            A: parseInt(post[0].Stonefruit),
            fullMark: 10
          },
          {
            subject: "Chocolate",
            A: parseInt(post[0].Chocolate),
            fullMark: 10
          },
          {
            subject: "Caramel",
            A: parseInt(post[0].Caramel),
            fullMark: 10
          },
          {
            subject: "Smoky",
            A: parseInt(post[0].Smoky),
            fullMark: 10
          },
          {
            subject: "Bitter",
            A: parseInt(post[0].Bitter),
            fullMark: 10
          },
          {
            subject: "Savory",
            A: parseInt(post[0].Savory),
            fullMark: 10
          },
          {
            subject: "Body",
            A: parseInt(post[0].Body),
            fullMark: 10
          },
          {
            subject: "Clean",
            A: parseInt(post[0].Clean),
            fullMark: 10
          },
        ])
      })
      .catch(error => alert(error.message))

  }, [id, post, setPost]);


  return (
     <div>
      <Navbar/>
      <div className={"Main"}>
        <div dangerouslySetInnerHTML={{__html: post[0].Content}}/>
        <RatingGraph data={taste}/>
        <Footer/>
      </div>
    </div>
  )
}

export default PostViewer;