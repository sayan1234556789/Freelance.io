import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './routes/ProtectedRoute'
import DashBoard from './pages/DashBoard'
import CreateProject from './pages/CreateProject'
import Projects from './pages/Projects'
import AuthRedirect from './routes/AuthRedirect'
import ClientDashboard from './pages/ClientDashboard'
import ProjectDetails from './pages/ProjectDetails'

const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/login' element = {
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        } />
      <Route path='/register' element = {
        <AuthRedirect>
          <Register />
        </AuthRedirect>
      } />
      <Route path='/verify/:token' element = {<VerifyEmail />} />
      <Route 
        path='/dashboard'
        element = {
          <ProtectedRoute role="freelancer">
            <DashBoard />
          </ProtectedRoute>
        }
      />

      <Route path='/projects' element = {<CreateProject />} />
      <Route path='/getallprojects' element = {<Projects />} />
      <Route path='/clientdashboard' element={
        <ProtectedRoute role="client">
          <ClientDashboard />
        </ProtectedRoute>
      } />

      <Route path='/projects/:id' element={<ProjectDetails />} />
    </Routes>
  )
}

export default App