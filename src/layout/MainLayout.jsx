import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components/Navbar/NavBar'
import { Footer } from '../components/Footer/Footer'
import { HeroSection } from '../components/HeroSection/HeroSection'




export const MainLayout = () => {
  return (
  <>
  <NavBar />
  <HeroSection />
  <Outlet />
  <Footer />
  </>
  )
}