import React from 'react'
import { useSelector } from 'react-redux'

import { ContentBox } from './style'

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username)

  return (
    <ContentBox>
      <div className="box-left">
        <div className="box-left-banner border mt-20"></div>
        <div className="box-left-article border mt-20">
          <div className="article-item">
            <div className="article-item-userinfo border"></div>
            <div className="article-item-title border">我是一个标题</div>
            <div className="article-item-content border"></div>
            <div className="article-item-interactive border"></div>
          </div>
        </div>
      </div>
      <div className="box-right ml-20">
        <div className="box-right-userinfo border mt-20">欢迎 {username}</div>
      </div>
    </ContentBox>
  )
}
