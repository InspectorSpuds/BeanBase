import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

//pages
import Home from './pages/Home'
import Login from './pages/Login'

//page routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }, 
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/CreateAccount",
    element: <p> not here yet : (</p>
  },
  {
    path: "/Search",
    element: <p> not here yet : (</p>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);

