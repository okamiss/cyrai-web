import React, { useEffect, useState } from 'react'
import {
  articleDetail,
  commentArticle,
  likeArticle,
  getComments,
  commentsReplies,
  commentsLikes
} from '@/apis/article'
import { useLocation } from 'react-router-dom'
import { ArticleDetailBox } from './style'
import { HeartOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import { getFileTypeByMime } from '@/utils/tool'
const { TextArea } = Input

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import SvgIcon from '@/components/SvgIcon'
import { useSelector } from 'react-redux'

export default function detail() {
  const location = useLocation()
  const artId = location.pathname.split('/').pop() as string
  const [artInfo, setArtInfo] = useState<getArticleBody>({
    _id: '',
    title: '',
    content: '',
    author: {
      _id: '',
      name: '',
      avatar: ''
    },
    likes: [],
    createdAt: '',
    comments: [],
    totalViews: 0,
    fields: []
  })
  const [messageApi, contextHolder] = message.useMessage()
  const [value, setValue] = useState('')
  const [islike, setIslike] = useState(false)
  const [comments, setComments] = useState<any>([])
  const [sendCtoC, setSendCtoC] = useState(false)
  const [nowComInfo, setNowComInfo] = useState<any>({})

  const getUserId = useSelector((state: RootState) => state.user.userId)

  useEffect(() => {
    getArt()
  }, [])

  // 加载评论列表
  const getCommentList = (id: string) => {
    getComments(id).then((res) => {
      setComments(res.data)
    })
  }

  // 文章详情
  const getArt = () => {
    articleDetail(artId).then((res) => {
      res.data.fields.forEach((fs) => {
        fs.fsType = getFileTypeByMime(fs.mimetype)
      })
      const isLike = res.data.likes.some((item) => item.id === getUserId)
      setIslike(isLike)
      setArtInfo(res.data)
      getCommentList(res.data._id)
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

    if (sendCtoC) {
      const params = {
        artId,
        commentId: '66a9e9b60ac2b783cc034381',
        text: value
      }
      commentsReplies(params).then((res) => {
        messageApi.open({
          type: 'success',
          content: res.message
        })
        setValue('')
        getArt()
      })
    } else {
      const params = {
        artId,
        text: value
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

  // 引用回复
  const replySend = (item: any) => {
    console.log(item)
    setSendCtoC(true)
    setNowComInfo(item)
  }

  // 评论点赞
  const replyLike = (item: any) => {
    commentsLikes(item._id)
  }

  return (
    <ArticleDetailBox className="m-1200-auto">
      {contextHolder}
      <div className="art-left border-box">
        <Swiper
          className="artSwiper"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {artInfo.fields.map((item) =>
            item.fsType === 'image' ? (
              <SwiperSlide key={item._id}>
                <img src={item.path} />
              </SwiperSlide>
            ) : (
              <SwiperSlide key={item._id}>
                <video src={item.path} controls></video>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
      <div className="art-right ml-10 border-box">
        <div className="author">
          <img src={artInfo.author.avatar} alt={artInfo.author.name} />
          <span>{artInfo.author.name}</span>
        </div>
        <div className="title">{artInfo.title}</div>
        <div className="content mt-20">{artInfo.content}</div>
        <div className="respond mt-30">
          <span>
            <SvgIcon name="viewLook" width="32px" height="32px"></SvgIcon>
            {artInfo.totalViews}
          </span>
          <span onClick={likeArt}>
            {!islike ? (
              <SvgIcon name="heartGray" width="32px" height="32px"></SvgIcon>
            ) : (
              <SvgIcon name="heartRed" width="32px" height="32px"></SvgIcon>
            )}

            {artInfo.likes.length}
          </span>

          {/* <HeartOutlined onClick={likeArt} /> <i>{artInfo.likes.length}</i> */}
        </div>
        <div className="comment">
          {sendCtoC ? <p>正在回复：{nowComInfo.text}</p> : null}

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

          {comments.map((item: any) => (
            <div className="comment-item" key={item._id}>
              <p>
                {item.user.name}： {item.text}
                <span onClick={() => replySend(item)}>回复</span>
                <span onClick={() => replyLike(item)}>点赞{item.likes}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </ArticleDetailBox>
  )
}
