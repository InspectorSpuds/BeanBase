import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import PostViewer from './pages/PostViewer'
import CreateUser from './pages/CreateUser';

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
    element: <Home />,
  },
  {
    path: "/Posts/:id",
    element: <PostViewer></PostViewer>,
  },
  {
    path: "/ManagePost",
    element: <p> not here yet : (</p>,
  },
  {
    path: "/CreateUser",
    element: <CreateUser></CreateUser>,
  },
  {
    path: "/CreatePost",
    element: <CreatePost></CreatePost>,
  }
  /*{
    path: "/Search/",
    element: <p> not here yet : (</p>
  },
  {
    path: "/Search/:search-term",
    element: <p> not here yet : (</p>
  }*/ 
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

