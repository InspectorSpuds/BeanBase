import './Home.css'
import Navbar from './Navbar';
import Footer from './Footer'
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

function Home() {
  //list of post objects to render on page
  const [postList, setPosts] = useState([]);


  //on start, populate the page with
  useEffect(() => {
    //make request to backend for post list

    //get info, 

    //add it to postList

  },[])

  //<PostCard date={'4/10/22'} title={'Testing Testing...'} filler={"Lorem ipsum..."}/>
  return (
    <div>
      <Navbar/>
      <div className={"Main"}>
        {}
        <Footer/>
      </div>
    </div>
  )
}

export default Home;