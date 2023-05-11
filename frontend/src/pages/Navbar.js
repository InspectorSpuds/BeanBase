import './Navbar.css'
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className={"Navbar"}>
      <div className="NavbarLeft">
        <Link to={"/"}>
          <div>⛾ Posts</div>
        </Link>
        <Link to={"/Search"}>
          <div>🔍 Search</div>
        </Link>
      </div>
      <div className={"NavbarRight"}>
        <Link to={"/Login"} id={"LoginButton"}>👤 Login</Link>
      </div>
    </div>
  )
}

export default Navbar; 