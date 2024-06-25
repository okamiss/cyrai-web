import React from 'react'
import { Modal } from 'antd'
import { headerLinks } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import styles  from './index.module.scss'
import { HeaderWrapper } from './style'
import { logout } from '@/store/reducers/user'

const config = {
  title: '退出登陆!'
}

const AppHeader: React.FC = () => {
  const dispatch = useDispatch()
  const [modal, contextHolder] = Modal.useModal()

  return (
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
            <span
              onClick={async () => {
                const confirmed = await modal.confirm(config)
                if (confirmed) {
                  dispatch(logout())
                }
              }}
            >
               登录
            </span>
          </div>
        </div>
      </div>
      {contextHolder}
    </HeaderWrapper>
  )
}

export default AppHeader
