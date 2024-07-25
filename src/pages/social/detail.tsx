import React, { useEffect, useState } from 'react'
import { articleDetail, commentArticle, likeArticle } from '@/apis/article'
import { useLocation } from 'react-router-dom'
import { ArticleDetailBox } from './style'
import { HeartOutlined } from '@ant-design/icons'

import { Button, Input, message } from 'antd'

const { TextArea } = Input

export default function detail() {
  const location = useLocation()
  const artId = location.pathname.split('/').pop() as string

  const [artInfo, setArtInfo] = useState<getArticleBody>({
    _id: '',
    title: '',
    content: '',
    author: {
      _id: '',
      name: ''
    },
    likes: [],
    createdAt: '',
    comments: []
  })
  const [messageApi, contextHolder] = message.useMessage()
  const [value, setValue] = useState('')

  useEffect(() => {
    getArt()
  }, [])

  // 文章详情
  const getArt = () => {
    articleDetail(artId).then((res) => {
      setArtInfo(res.data)
    })
  }

  // 评论
  const sendComment = () => {
    if (!value) {
      messageApi.open({
        type: 'error',
        content: '评论不能为空！'
      })
      return
    }

    const params = {
      artId,
      comment: value
    }
    commentArticle(params).then((res) => {
      messageApi.open({
        type: 'success',
        content: res.message
      })
      setValue('')
      getArt()
    })
  }

  // 点赞
  const likeArt = () => {
    likeArticle(artId).then((res) => {
      messageApi.open({
        type: 'success',
        content: res.message
      })
      getArt()
    })
  }

  return (
    <ArticleDetailBox className="m-1200-auto">
      {contextHolder}
      <div className="title">{artInfo.title}</div>
      <div className="desc">作者：{artInfo.author.name}</div>
      <div className="content">{artInfo.content}</div>
      <div className="like mt-10">
        <HeartOutlined onClick={likeArt} /> <i>{artInfo.likes.length}</i>
      </div>
      <div className="comment">
        <div className="comment-tit">评论区</div>

        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 5, maxRows: 10 }}
        />
        <Button type="primary" onClick={sendComment}>
          发表评论
        </Button>

        {artInfo.comments.map((item) => (
          <div className="comment-item" key={item._id}>
            <p>{item.user.name}</p>
            <span>{item.comment}</span>
          </div>
        ))}
      </div>
    </ArticleDetailBox>
  )
}
