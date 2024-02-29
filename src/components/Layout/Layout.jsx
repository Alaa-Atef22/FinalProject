import React, { useContext, useEffect } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../Context/TokenContext';

export default function Layout() {
let {setToken} =useContext(userContext)
  useEffect(()=>{
if(localStorage.getItem('userToken')!==null){
  setToken(localStorage.getItem('userToken'))}},[setToken])
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
