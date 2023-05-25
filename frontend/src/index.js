import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import PostViewer from './pages/PostViewer'

//routes
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
    path: "/Posts",
    element: <p>404 not found, no postID passed</p>
  },
  {
    path: "/Posts/:id",
    element: <PostViewer></PostViewer>,
  },
  {
    path: "/CreateAccount",
    element: <p> not here yet : (</p>
  },
  {
    path: "/Search/",
    element: <p> not here yet : (</p>
  }, 
  {
    path: "/Search/:search-term",
    element: <p> not here yet : (</p>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

