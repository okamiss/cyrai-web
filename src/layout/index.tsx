import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import { ContainerBox } from './style'
import { createContext, useEffect, useState } from 'react'
// import { getUserInfo } from '@/apis/user'
import { useSelector } from 'react-redux'

export const userContext = createContext<getUser>({
  name: '',
  email: '',
  avatar: ''
})

export default function layout() {
  const getUserInfo = useSelector((state: RootState) => state.user)

  // console.log(getUserInfo, 'token')

  const { name, email, avatar } = getUserInfo

  // useEffect(() => {
  //   if (!token) return
  //   getUserInfo().then((res) => {
  //     setUserinfo(res.data)
  //   })
  // }, [])

  return (
    <userContext.Provider value={{ name, email, avatar }}>
      <AppHeader />
      <ContainerBox>
        <Outlet />
      </ContainerBox>
    </userContext.Provider>
  )
}
