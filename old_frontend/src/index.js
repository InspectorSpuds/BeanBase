import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";


//pages
import Home from './pages/Home'
import Login from './pages/Login'
import PostViewer from './pages/PostViewer'
import CreateUser from './pages/CreateUser';
import CreatePost from './pages/CreatePost';
import SectionPostCreate from './pages/NewPostCreator'
import ManagePosts from './pages/ManagePosts';

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
    path: "/CreateUser",
    element: <CreateUser></CreateUser>,
  },
  {
    path: "/CreatePost",
    element: <SectionPostCreate></SectionPostCreate>,
  },
  {
    path: "/ManagePosts/",
    element: <ManagePosts></ManagePosts>,
  },
  {
    path: "/BrewHelper",
    element: null,
  },
  //{
  //  path: "/UpdatePost/:id",
  //  element: <p> 404- not found</p>,
  //}
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
