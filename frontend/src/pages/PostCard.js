import './PostCard.css';
import { Link, useNavigate } from 'react-router-dom';
import React from "react";

//Preconditions: a valid PostInfo object consisting of:
// -Date Posted
// -Title
// -Filler Description

//OPTIONAL DEPENDENCY INJECTION : (to allow for updated update and delete options with slightly altered styling)
//--deletable, deleteFunction, updatePath: will add update and delete buttons for the post
//  preconditions: MUST HAVE ALL of the above props in addition and they must be correct
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
    <div className={(!deletable ? "CardWrapper" : "CardWrapper_update")} onClick={e => (!deletable ? navigate(`/POSTS/${POSTID}`) : 0)}>
      <div className={"CardTitle"}>
        <h2>{TITLE}</h2>  
      </div>
      {deletable ? //if deletable is set as a prop to true, 
        <div className={"PostOptions"}>
          <button id={"BUTTONOFLESSDOOM"} onClick={e => navigate('/')}>Update</button>
          <button id={"BUTTONOFDOOM"} onClick={e => deleteFunction(POSTID, TITLE)}>Delete</button>
        </div> : 
        <></>
      }
      <div className={"CardFooter"}>
        <h2>{DATE}</h2>
      </div>
    </div>
  )
}


export default PostCard;