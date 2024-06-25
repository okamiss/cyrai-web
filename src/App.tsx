import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import router from '@/router'
import { useEffect } from 'react'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import AppHeader from './components/AppHeader'

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  // 去往登录页的组件
  function ToLogin() {
    const navigateTo = useNavigate()
    useEffect(() => {
      navigateTo('/login')
      messageApi.open({
        type: 'warning',
        content: '您还没有登录，请登录后再访问!'
      })
    }, [])
    return <div></div>
  }
  // 去往首页的组件
  function ToHome() {
    const navigateTo = useNavigate()
    useEffect(() => {
      navigateTo('/home')
      messageApi.open({
        type: 'success',
        content: '已登录!'
      })
    }, [])
    return <div></div>
  }
  // 手写封装路由守卫
  function BeforeRouterEnter() {
    const outlet = useRoutes(router)
    const location = useLocation()
    const token = useSelector((state: RootState) => state.user.token)

    // if (location.pathname === '/login' && token) {
    //   return <ToHome />
    // }
    // if (location.pathname !== '/login' && !token) {
    //   return <ToLogin />
    // }
    return outlet
  }

  return (
    <div className="App">
      {contextHolder}
      <AppHeader />
      <BeforeRouterEnter />
    </div>
  )
}

export default App
