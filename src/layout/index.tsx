import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import { ContainerBox } from './style'
import { createContext, useEffect, useState } from 'react'
import { getUserInfo } from '@/apis/user'

export const userContext = createContext<getUser>({})

export default function layout() {
  const [userinfo, setUserinfo] = useState<getUser>({
    name: '',
    email: '',
    avatar: ''
  })

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserinfo(res.data)
    })
  }, [])

  return (
    <userContext.Provider value={userinfo}>
      <AppHeader />
      <ContainerBox>
        <Outlet />
      </ContainerBox>
    </userContext.Provider>
  )
}
