import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

import { useNavigate } from 'react-router-dom'
import initLoginBg from './initbg'
import { Box } from './style'
import { Button, Checkbox, Form, Input } from 'antd'
import { Login } from '@/store/reducers/user'
import { useDispatch } from 'react-redux'

export default function index() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  //粒子被正确加载到画布中时，这个函数被调用
  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container, 'container')
  }, [])

  const onFinish = (values: LoginType) => {
    dispatch(Login(values) as any)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={initLoginBg as any}
      />

      <Box>
        {/* <Button type="primary" onClick={login}>
          登录
        </Button> */}
        <Form
          layout="vertical"
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<LoginType>
            label={<label style={{ color: '#fff' }}>Username</label>}
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item<LoginType>
            label={<label style={{ color: '#fff' }}>Password</label>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="请输入" />
          </Form.Item>

          <Form.Item<LoginType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{ backgroundColor: '#35d4c7' }} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </div>
  )
}
