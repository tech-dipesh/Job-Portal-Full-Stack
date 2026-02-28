import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {RouterProvider, createBrowserRouter} from "react-router"
import Jobs from "./pages/Jobs"
import EachJob from './pages/eachJobs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/verifyEmail'
import ColorPaletteTester from './Colorsuggestion'
import Home from './pages/Home'
import Dashboarduser from "./pages/Dashboard-user"
let router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "jobs",
        element: <Jobs/>
      },
      {
        path: "jobs",
        element: <Jobs/>
      },
      {
        path: "jobs/:jobId",
        element: <EachJob/>
      },
      {
        path: "Login",
        element: <Login/>
      },
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "verify-email",
        element: <VerifyEmail/>
      },
      {
        path: "user/dashboard",
        element: <Dashboarduser/>
      },
      {
        path: "test",
        element: <ColorPaletteTester/>
      },
  ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
