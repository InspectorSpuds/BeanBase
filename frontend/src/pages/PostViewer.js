import './PostViewer.css'
import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import RequestSender from '../api/RequestSender';
import RatingGraph from './RatingGraph';


function PostViewer() {
  const {id} = useParams();               //the post id extracted from the route
  const [post, setPost] = useState([]);   //actual post content
  const [taste, setTaste] = useState([]); //taste rating data
  
  //fetch all the data
  useEffect(() => {
    const getter = new RequestSender();

    //get the actual post itself then extract the content and rating
    getter.getPost_withID(id)
      .then(response => {
        console.log(response)
        setPost((response.data[0].Content.replace('\\\'','\'').replace('\\\"','\"'))) //replace special characters and new line characters
        setTaste([
          {
            subject: "Finish",
            A: parseInt(response.data[0].Finish),
            fullMark: 10
          },
          {
            subject: "Sweet",
            A: parseInt(response.data[0].Sweet),
            fullMark: 10
          },
          {
            subject: "Acidic",
            A: parseInt(response.data[0].Acidic),
            fullMark: 10
          },
          {
            subject: "Spicy",
            A: parseInt(response.data[0].Spicy),
            fullMark: 10
          },
          {
            subject: "Salty",
            A: parseInt(response.data[0].Salty),
            fullMark: 10
          },
          {
            subject: "Berry",
            A: parseInt(response.data[0].Berry),
            fullMark: 10
          },
          {
            subject: "Citrus",
            A: parseInt(response.data[0].Citrus),
            fullMark: 10
          },
          {
            subject: "Stonefruit",
            A: parseInt(response.data[0].Stonefruit),
            fullMark: 10
          },
          {
            subject: "Chocolate",
            A: parseInt(response.data[0].Chocolate),
            fullMark: 10
          },
          {
            subject: "Caramel",
            A: parseInt(response.data[0].Caramel),
            fullMark: 10
          },
          {
            subject: "Smoky",
            A: parseInt(response.data[0].Smoky),
            fullMark: 10
          },
          {
            subject: "Bitter",
            A: parseInt(response.data[0].Bitter),
            fullMark: 10
          },
          {
            subject: "Savory",
            A: parseInt(response.data[0].Savory),
            fullMark: 10
          },
          {
            subject: "Body",
            A: parseInt(response.data[0].Body),
            fullMark: 10
          },
          {
            subject: "Clean",
            A: parseInt(response.data[0].Clean),
            fullMark: 10
          },
        ])
      })
      .catch(error => alert(error.message))

  }, []);


  return (
     <div>
      <Navbar/>
      <div className={"Main"}>
        <div>
          {           
            String(post).split("\n").map(element => {
              return <>
                <div>{element}</div>
                <br></br>
              </>
            })
          }
        </div>
        <RatingGraph data={taste}/>
        <Footer/>
      </div>
    </div>
  )
}

export default PostViewer;