import { message } from 'antd'

import axios from 'axios'

import store from '@/store'
import { logout } from '@/store/reducers/user'

// import { useSelector, useDispatch } from 'react-redux'

// const user = useSelector(state => state.user)
// console.log(user);

// 创建axios实例
const instance = axios.create({
  // 基本请求路径的抽取
  baseURL: import.meta.env.VITE_SERVE,
  // 这个时间是你每次请求的过期时间，这次请求认为20秒之后这个请求就是失败的
  timeout: 20000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    const data = res.data
    // const userStore = useUserStore()
    if (data?.code == 200) {
      return data
    } else if (data?.code == 201) {
      message.error(data.message)
      store.dispatch(logout())
    } else {
      message.error(data.message)
      return Promise.reject(data)
    }
  },
  (err) => {
    message.error(err.response.data.message)
    return Promise.reject(err)
  }
)

export default instance
