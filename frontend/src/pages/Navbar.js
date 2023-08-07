import './Navbar.css'
import { Link, useNavigate} from "react-router-dom";
import React, { useState } from "react";
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
    login = (<div className={"NavbarRight"}>
              <button id={"LoginButton"} onClick={removeCookie}>Logout</button>
            </div>
            )
  } else {
    login = (<div className={"NavbarRight"}>
              <Link to={"/Login"} id={"LoginButton"}>👤 Login</Link>
            </div>
            )
  }

  return (
    <div className={"Navbar"}>
      <div className="NavbarLeft">
       <img src={require('../img/muggy-dude-export.png')} alt="My logo" />
        <Link to={"/"}>
          <div>⛾ Posts</div>
        </Link>
        <Link to={"/CreatePost"}>
          <div>➕ Create Post</div>
        </Link>
      </div>
      {login}
    </div>
  )
}

export default Navbar; 