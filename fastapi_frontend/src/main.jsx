import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  RouterProvider
} from 'react-router-dom'
import Layout from './Layout'
import CoursesPage from './pages/CoursesPage'
import StudentsPage from './pages/StudentsPage'
import { Toaster } from 'react-hot-toast'
import StudentsDetailsPage from './pages/StudentsDetailsPage'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<App />} />
      <Route path='/courses' element={<CoursesPage />} />
      <Route path='/students' element={<StudentsPage />} />
      <Route path='/student/:id' element={<StudentsDetailsPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {' '}
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
)
