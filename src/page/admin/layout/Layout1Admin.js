import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation } from './navigation/Navigation'
import { TabMenu } from './tabMenu/TabMenu'
import { useNavigate } from 'react-router-dom'

export const Layout1Admin = () => {

  const navigate = useNavigate()

  const {pathname} = window.location;

  useEffect(()=> {
    if(!localStorage.getItem('jwtAdmin')) {
      navigate('/admin/login');
    }
  }, [pathname])

  return (
    <div className="flex h-screen">
      <Navigation/>
      <div className="w-[calc(100%-250px)] h-full">
        <TabMenu/>
        <div className="px-[20px] py-[15px] h-[92%]">
          <Outlet/>
        </div>  
      </div>
    </div>
    
  )
}
