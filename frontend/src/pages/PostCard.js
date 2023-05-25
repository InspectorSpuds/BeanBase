import './PostCard.css';
import { Link } from 'react-router-dom';

//Preconditions: a valid PostInfo object consisting of:
// -Date Posted
// -Title
// -Filler Description
function PostCard(props) {
  const CHAR_LIMIT = 200;
  const POST_INFO = props;
  const DATE =   POST_INFO.date;
  const FILLER = POST_INFO.filler.length > CHAR_LIMIT ? POST_INFO.filler.slice(CHAR_LIMIT)  : POST_INFO.filler;
  const TITLE =  POST_INFO.title;
  const POSTID = POST_INFO.route;

  return (
    <div className={"CardWrapper"}>
      <div className={"CardBorder"} >
        <div className={"CardContent"}>
          <div className={"PostCardHeader"}>
            <h2>{TITLE}</h2>
            <div className={"PostCardDate"}>{DATE}</div>
          </div>
          <div className={"PostCardDescr"}>
            <div>{FILLER}</div>
            <Link to={`/Post/${POSTID}`} id={"LoginButton"}> Read More....</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PostCard;