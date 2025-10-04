import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Discover from "./components/Discover.jsx";
import Library from "./components/Library.jsx";
import PlayLists from "./components/PlayLists.jsx";
import MainContent from "./components/MainContent.jsx";
import Profile from "./components/Profile.jsx";
import Trending from "./components/Trending.jsx";
import NewReleases from "./components/NewReleases.jsx";
import Recommendation from "./components/Recommendation.jsx";
import Auth from "./components/Auth.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegister from "./components/UserRegister.jsx";
import SingerLogin from "./components/SingerLogin.jsx";
import SingerRegister from "./components/SingerRegister.jsx";
import UserViewSingerProfile from "./components/userViewSingerProfile.jsx";
import Song from "./components/Song.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainContent />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "playlist",
        element: <PlayLists />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "topTracks",
        element: <Trending />,
      },
      {
        path: "newReleases",
        element: <NewReleases />,
      },
      {
        path: "recommended",
        element: <Recommendation />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "singer/:sid",
        element: <UserViewSingerProfile />,
      },
      {
        path: "songs/:id",
        element: <Song />,
      },
    ],
  },
  {
    path: "userlogin",
    element: <UserLogin />,
  },
  {
    path: "userregister",
    element: <UserRegister />,
  },
  {
    path: "singerlogin",
    element: <SingerLogin />,
  },
  {
    path: "singerregister",
    element: <SingerRegister />,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
