import React, { Fragment, useState } from 'react'
import type { FormProps } from 'antd'
import { TinyColor } from '@ctrl/tinycolor'

import { Button, Checkbox, ConfigProvider, Form, Input, Modal, Space, message } from 'antd'
import { headerLinks } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import styles  from './index.module.scss'
import { HeaderWrapper } from './style'
import { userLogin } from '@/apis/login'

// import { logout } from '@/store/reducers/user'

// const config = {
//   title: '退出登陆!'
// }

const colors1 = ['#6253E1', '#04BEFE']
const colors2 = ['#40e495', '#30dd8a', '#2bb673']

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString())
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString())

const AppHeader: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const dispatch = useDispatch()
  // const [modal, contextHolder] = Modal.useModal()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish: FormProps<AccountType>['onFinish'] = (values) => {
    console.log('Success:', values)

    userLogin(values).then((res) => {
      messageApi.open({
        type: 'success',
        content: 'This is a success message'
      })
    })
  }

  const onFinishFailed: FormProps<AccountType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Fragment>
      {contextHolder}
      <HeaderWrapper>
        <div className="content">
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div className="select-item" key={index}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })}
            <div className="select-item right">
              <span onClick={showModal}>登录</span>
            </div>
          </div>
        </div>
        {/* {contextHolder} */}
      </HeaderWrapper>
      <Modal title="登录账号" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<AccountType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<AccountType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<AccountType>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
                      colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(
                        ', '
                      )})`,
                      colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(
                        ', '
                      )})`,
                      lineWidth: 0
                    }
                  }
                }}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </ConfigProvider>

              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(116deg,  ${colors2.join(', ')})`,
                      colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors2).join(
                        ', '
                      )})`,
                      colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors2).join(
                        ', '
                      )})`,
                      lineWidth: 0
                    }
                  }
                }}
              >
                <Button type="primary" htmlType="button">
                  注册
                </Button>
              </ConfigProvider>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default AppHeader
