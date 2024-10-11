import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Home from "./pages/Home";
import { ErrorPage } from "./ErrorPage";

import Register from "./pages/Register";
import Login from "./pages/Login";

import Whistles from "./pages/Whistles";
import CreateEvent from "./pages/CreateEvent";
import OneWhistle from "./pages/OneWhistle";

// import Ticketing from "./pages/Ticketing";
import UserWhistles from "./pages/UserWhistles";
// import SingleTicket from "./pages/SingleTicket";

import UserProfile from "./pages/UserProfile";
// import UserEventAttended from "./pages/UserEventAttended";

// import CreatorMode from "./pages/CreatorMode";
import CreatorModeView from "./pages/CreatorModeView";
import CreatorModeViewMore from "./pages/CreatorModeViewMore";

const router = createBrowserRouter([
  {
    path: "/issues",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/whistles",
    element: <Whistles />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/one",
    element: <OneWhistle />,
    errorElement: <ErrorPage />,
  },

  // {
  //   path: "/like",
  //   element: <Ticketing />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/create",
    element: <CreateEvent />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user_whistles",
    element: <UserWhistles />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/view_user_whistles",
    element: <CreatorModeView />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/user_bookmarks",
  //   element: <SingleTicket />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/user_likes",
  //   element: <SingleTicket />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/event_attended",
  //   element: <UserEventAttended />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/event_created/",
  //   element: <CreatorMode />,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: "/view_user_bookmarks",
  //   element: <CreatorModeView />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/view_user_likes",
  //   element: <CreatorModeView />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/view_option",
    element: <CreatorModeViewMore />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
