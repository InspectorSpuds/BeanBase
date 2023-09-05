import './PostCard.css';
import { Link, useNavigate } from 'react-router-dom';
import React from "react";

//Preconditions: a valid PostInfo object consisting of:
// -Date Posted
// -Title
// -Filler Description
function PostCard(props) {
  const CHAR_LIMIT = 200;
  const POST_INFO = props;
  const DATE =   new Date(POST_INFO.date).toLocaleDateString();
  const TITLE =  POST_INFO.title;
  const POSTID = POST_INFO.id;
  const deletable = POST_INFO.deletable;
  const deleteFunction = POST_INFO.deleteFunction;

  const navigate = useNavigate();

  return (
    <div className={"CardWrapper"} onClick={e => (!deletable ? navigate(`/POSTS/${POSTID}`) : deleteFunction(POSTID, TITLE))}>
      <div className={"CardTitle"}>
        <h2>{TITLE}</h2>  
      </div>
      <div className={"CardFooter"}>
        <h2>{DATE}</h2>
      </div>
    </div>
  )
}


export default PostCard;