import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='overflow-x-hidden '>
        <Header />
        <div className='mt-24  mx-auto  '>
            <Outlet/>
          </div>
    </div>
  )
}

export default Layout