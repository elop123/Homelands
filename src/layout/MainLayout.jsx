import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/Navbar/NavBar'
import { Footer } from '../components/Footer/Footer'





export const MainLayout = () => {
  return (
  <>
  <NavBar />
  <Outlet />
  <Footer />
  </>
  )
}