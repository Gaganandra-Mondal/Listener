import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Discover from './components/Discover.jsx'
import Library from './components/Library.jsx'
import PlayLists from './components/PlayLists.jsx'
import Radio from './components/Radio.jsx'
import MainContent from './components/MainContent.jsx'
  const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<MainContent/>
      },
      {
        path:"discover",
        element:<Discover/>        
      },
      {
        path:"library",
        element:<Library/>
      },
      {
        path:"playlist",
        element:<PlayLists/>
      },
      {
        path:"radio",
        element:<Radio/>
      },      
    ]
  }]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
