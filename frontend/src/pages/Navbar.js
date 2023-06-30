import './Navbar.css'
import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <div className={"Navbar"}>
      <div className="NavbarLeft">
       <img src={require('../img/muggy-dude-export.png')} alt="My logo" />
        <Link to={"/"}>
          <div>⛾ Posts</div>
        </Link>
        <Link to={"/Search"}>
          <div>🔍 Search</div>
        </Link>
        <Link to={"/CreatePost"}>
          <div>➕ Create Post</div>
        </Link>
      </div>
      <div className={"NavbarRight"}>
        <Link to={"/Login"} id={"LoginButton"}>👤 Login</Link>
      </div>
    </div>
  )
}

export default Navbar; 