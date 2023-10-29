import './Login.css'
import { useRef, useState, useEffect} from "react";
import {useNavigate, redirect} from "react-router-dom";
import Navbar from "./Navbar"
import Footer from "./Footer"
import React from "react";
import RequestSender from '../api/RequestSender';
import Cookies from 'universal-cookie';

function LoginRow(props) {
  return (
    <div className="LoginRow">
      <label>{props.name}</label>
      <br></br>
      <input type={props.name=="Password" ? "password" : "text"} onChange={obj => props.setterHook(obj)} />
    </div>
  )
}

function Login() {
  //submit button reference, (to allow for masking event listeners)
  const loginForm = useRef(null);

  //login form field hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //field setter actions
  const setData = (event, setter) => {setter(event.target.value);};
  const alterUsername = (event) => setData(event, setUsername);
  const alterPassword = (event) => setData(event, setPassword);

  useEffect(() => {
    //handle already logged in
    if(cookies.get('session-token')) {
      alert("Already logged in, navigating back")
      navigate('/')
    }
  },[]);
  
  //preconditions: form fields must be validly handled and event must be a valid submit event
  //process: validates fields and creates user in db if successful
  //postconditions: db will be updated with new user and user will be logged into system 
  const processNewUser = (e) => {
    e.preventDefault();

    const reqSender = new RequestSender();

    reqSender.loginUser(username, password)
      .then(response => {
        console.log(response)
        alert("Successfully Logged In!")

        //create a cookie with the login information
        const cookies = new Cookies();
        cookies.set('session-token', response.data.accessToken, { path: '/' })
        navigate('/');
      } )
      .catch(error=> alert(error.message))

  };

  //just navigates user to create account page, nothing special
  const redirectToCreate = () => {navigate('/CreateUser')}

  //check if there is a login token
  const cookies = new Cookies();
  
  return (
    //check if already logged in
      //if logged in, redirect back to home page
      //else display page
    <div className='RootLayout'>
      <Navbar />

      <div className={"ScrollableWrapper"}>
        <div className={"LoginWrapper"}>
          <form className={"LoginBox"} ref={loginForm} onSubmit={e => processNewUser(e)}>
            <label>Login</label>
            <div className={"LoginFields"}>
              <LoginRow id={1} name={"Username"} setterHook={alterUsername} />
              <LoginRow id={2} name={"Password"} setterHook={alterPassword} />
            </div>
            <div className={"LoginActions"}>
              <input id={"ConfirmLogin"} type="submit" value={"Login"} />
              <input id={"CreateAccountButton"} type="button" value={"Create Account"} onClick={redirectToCreate} style={{backgroundColor: "orange"}}/>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Login;