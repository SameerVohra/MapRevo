import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from "./components/Login"
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element: <App/>, 
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/:username/Home",
        element: <Home/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={routes}/>
)
