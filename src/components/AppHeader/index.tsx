import React, { Fragment, useEffect, useState } from 'react'
import { TinyColor } from '@ctrl/tinycolor'
import { Button, ConfigProvider, Dropdown, Form, Input, Modal, message } from 'antd'
import { headerLinks } from '@/common/local-data'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { HeaderWrapper } from './style'
import { userRegister, userLogin } from '@/apis/user'
import { logout, saveLoginInfo } from '@/store/reducers/user'

import type { FormProps, MenuProps } from 'antd'

import styles from './index.module.scss'

const colors1 = ['#6253E1', '#04BEFE']
const colors2 = ['#40e495', '#30dd8a', '#2bb673']

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString())
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString())

const config = {
  title: '要退出当前账号吗？',
  content: <></>
}

const AppHeader: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token)
  const name = useSelector((state: RootState) => state.user.name)

  const [messageApi, contextHolder] = message.useMessage()
  const [modal, contextHolder2] = Modal.useModal()

  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logRegtype, setLogRegtype] = useState(1)
  const [form] = Form.useForm()

  const navigateTo = useNavigate()

  const [scrollDirection, setScrollDirection] = useState('')
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (!currentScrollTop) {
        setScrollDirection('')
      } else if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down')
      } else if (currentScrollTop < lastScrollTop) {
        setScrollDirection('up')
      }
      setLastScrollTop(currentScrollTop)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <>个人中心</>,
      onClick: () => {
        navigateTo('/userinfo')
      }
    },
    {
      key: '2',
      label: <>退出登录</>,
      onClick: async () => {
        const confirmed = await modal.confirm(config)
        if (confirmed) {
          message.success('退出成功')
          dispatch(logout())
        }
      }
    }
  ]

  // 打开登录框
  const showModal = () => {
    setIsModalOpen(true)
  }

  // 关闭登录框
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 登录
  const onFinish: FormProps<AccountType>['onFinish'] = (values) => {
    console.log('Success:', values)
    setLoading(true)
    userLogin(values)
      .then((res) => {
        setLoading(false)
        messageApi.open({
          type: 'success',
          content: res.message
        })

        dispatch(saveLoginInfo(res.data))
        setIsModalOpen(false)
        form.resetFields()
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // 注册
  const register = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue()
      setLoading(true)
      userRegister(values)
        .then((res) => {
          setLoading(false)
          messageApi.open({
            type: 'success',
            content: res.message
          })
          // setIsModalOpen(false)
          form.resetFields()
          setLogRegtype(1)
        })
        .catch(() => {
          setLoading(false)
        })
    })
  }

  return (
    <Fragment>
      {contextHolder}
      {contextHolder2}
      <HeaderWrapper
        className={`${
          scrollDirection === 'up'
            ? styles.active
            : scrollDirection === 'down'
            ? styles.inactive
            : ''
        }`}
      >
        <div className="content">
          <div className="select-list">
            {headerLinks.map((item, index) => {
              return (
                <div className="select-item" key={index}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })}
            {!token ? (
              <div className="select-item right">
                <span onClick={showModal}>登录/注册</span>
              </div>
            ) : (
              <div className="select-item right">
                {/* <span
                  onClick={async () => {
                    const confirmed = await modal.confirm(config)
                    if (confirmed) {
                      dispatch(logout())
                    }
                  }}
                >
                  退出
                </span> */}
                <Dropdown menu={{ items }} placement="bottom">
                  <span>你好，{name}</span>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
        {/* {contextHolder} */}
      </HeaderWrapper>
      <Modal title="登录账号" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          form={form}
          name="loginform"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<AccountType>
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input />
          </Form.Item>

          {logRegtype === 2 && (
            <Form.Item<AccountType>
              label="用户名"
              name="name"
              rules={[{ required: logRegtype === 2, message: '请输入账号！' }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item<AccountType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {logRegtype === 1 ? (
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
                <Button type="primary" htmlType="submit" loading={loading}>
                  登录
                </Button>
                <Button type="link" onClick={() => setLogRegtype(2)}>
                  暂无账号？去注册！
                </Button>
              </ConfigProvider>
            ) : (
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
                <Button type="primary" htmlType="button" onClick={register} loading={loading}>
                  注册
                </Button>
                <Button type="link" onClick={() => setLogRegtype(1)}>
                  已有账号？去登录！
                </Button>
              </ConfigProvider>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  )
}

export default AppHeader
