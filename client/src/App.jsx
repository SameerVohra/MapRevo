import { Navigate, Outlet } from 'react-router'
import './App.css'

function App() {
  return (
    <>
      <Navigate to="/login"/>
      <Outlet/>
    </>
  )
}

export default App
