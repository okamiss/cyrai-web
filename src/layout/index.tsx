import React from 'react'
import { Outlet } from 'react-router-dom'

export default function layout() {
  return (
    <div>
        <Outlet />
    </div>
  )
}
