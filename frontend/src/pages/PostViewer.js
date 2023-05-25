import './PostViewer.css'
import {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadScreen from './LoadScreen';

function PostViewer() {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    setTimeout(() => {setPost(post => "")}, 2000);
  }, [id, post, setPost]);


  if(post === null) 
    return ((<LoadScreen></LoadScreen>))

  return (
     <div>
     <Navbar/>
     <div className={"Main"}>
       <Footer/>
     </div>
    </div>
  )
}

export default PostViewer;