import React from 'react'
import {Title} from '../components/Title/Title'
import { Login } from '../components/Login/Login'


export const LoginPage = () => {
  return (
    <>
    <Title title="Login" style={{ textAlign: 'left' }} />
    <Login />
    </>
  )
}
