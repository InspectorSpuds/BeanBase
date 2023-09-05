import './Navbar.css'
import { Link, useNavigate} from "react-router-dom";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus, faGear, faRightToBracket} from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';





function Navbar() {
  const cookies = new Cookies();
  let login = null;
  const [token, setToken] = useState(cookies.get("session-token"));
  const navigate = useNavigate();


  //remove cookie and trigger rerender
  const removeCookie = () => {
    alert("You are now Logged out!")
    cookies.remove("session-token")
    setToken(prev => null);
    navigate('/')
  }

  //handle login button status
  if(cookies.get("session-token") !== undefined || cookies.get("session-token" !== null)) {
    login = (
              <button id={"LoginButton"} onClick={removeCookie}>Logout<FontAwesomeIcon icon={faRightToBracket} /></button>
            )
  } else {
    login = (
              <button id={"LoginButton"} onClick={e => navigate('/login')}>Login <FontAwesomeIcon icon={faRightToBracket} /></button>
            )
  }


  return (
    <div className={"Navbar"}>
        <div className={"NavbarLeft"}>
          <Link to={"/"}>
            <div>
              <FontAwesomeIcon icon={faHouse} /> 
            </div>
          </Link>
          <Link to={"/CreatePost"}>
            <div>
              <FontAwesomeIcon icon={faPlus} /> Create
            </div>
          </Link>
          <Link to={"/ManagePosts"}>
            <div> 
              <FontAwesomeIcon icon={faGear} /> Manage
            </div>
          </Link>
        </div> 
      <div className={"NavbarRight"}>
        {login}
      </div>
    </div>
  )
}



export default Navbar; 