import { useRef, useEffect } from "react";
import RequestSender from "../api/RequestSender"

function Login() {
  //submit button reference, (to allow for masking event listeners)
  const loginForm = useRef(null);
  //backend request sender
  const validator = new RequestSender();

  //add event listeners for form submit, etc. 
  useEffect(() => {
    const submit = loginForm.ref;
    if(!submit) return;
    
    //handle form submit
    submit.addEventListener("submit", (e) => {
      e.preventDefault();
    })
  }, [])


  return (
    //check if already logged in
      //if logged in, redirect back to home page
      //else display page
    <div>
      <form ref={loginForm}>
        <button >Login</button>
      </form>
    </div>
  )
}

export default Login;