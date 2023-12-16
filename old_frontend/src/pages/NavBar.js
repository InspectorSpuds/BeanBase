import './NavBar.css'
import { Link, useNavigate} from "react-router-dom";
import React, { useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus, faGear, faRightToBracket, faMugHot} from '@fortawesome/free-solid-svg-icons'
import Cookies from 'universal-cookie';
import useWindowDimensions from '../api/WindowDimensions';
import Dropdown from 'react-bootstrap/Dropdown';




function NavBar() {
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("session-token"));
  const dimensions = useWindowDimensions();
  const leftNavbarRef = useRef(null);
  const navigate = useNavigate();
  let login = null;



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

  //resize navbar items to burger menu if screen width drops below certain threshold



  return (
    <div className={"Navbar"}>

        <div ref={leftNavbarRef} className={"NavbarLeft"}>

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
          <Link to={"/BrewHelper"}>  
            <div>
              <FontAwesomeIcon icon={faMugHot} /> Brew Helper
            </div>
          </Link>
        </div> 
      <div className={"NavbarRight"}>
        {login}
      </div>
    </div>
  )

}



export default NavBar; 