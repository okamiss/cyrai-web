import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/AppHeader'
import { ContainerBox } from './style'

export default function layout() {
  return (
    <div>
      <AppHeader />
      <ContainerBox>
        <Outlet />
      </ContainerBox>
    </div>
  )
}
