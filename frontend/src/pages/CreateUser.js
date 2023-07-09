import './CreateUser.css'
import { useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar"
import Footer from "./Footer"
import React from "react";
import RequestSender from '../api/RequestSender';

function LoginRow(props) {
  return (
    <div className="LoginRow">
      <label>{props.name}</label>
      <br></br>
      <input type="text" onChange={obj => props.setterHook(obj)} />
    </div>
  )
}

function CreateUser() {
  //submit button reference, (to allow for masking event listeners)
  const loginForm = useRef(null);

  //create form field hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //field setter actions
  const setData = (event, setter) => {
    setter(event.target.value);
  }
  const alterUsername = (event) => setData(event, setUsername);
  const alterPassword = (event) => setData(event, setPassword);

  //preconditions: form fields must be validly handled and event must be a valid submit event
  //process: validates fields and creates user in db if successful
  //postconditions: db will be updated with new user and user will be logged into system 
  const processNewUser = (e) => {
    e.preventDefault();

    const reqSender = new RequestSender();

    reqSender.createUser(username, password)
      .then(resolve => {
        alert("successful user creation");

        navigate('/');
      })
      .catch(error => alert(error.message))

  };


  return (
    //check if already logged in
      //if logged in, redirect back to home page
      //else display page
    <div className='RootLayout'>
      <Navbar />

      <div className={"ScrollableWrapper"}>
        <div className={"LoginWrapper"}>
          <form className={"LoginBox"} ref={loginForm} onSubmit={e => processNewUser(e)}>
            <label>Create Account</label>
            <div className={"LoginFields"}>
              <LoginRow id={1} name={"Username"} setterHook={alterUsername} />
              <LoginRow id={2} name={"Password"} setterHook={alterPassword} />
            </div>
            <div className={"LoginActions"}>
              <input type="submit" value={"Create Account"} />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default CreateUser;