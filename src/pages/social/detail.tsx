import React, { useEffect, useState } from 'react'
import {
  articleDetail,
  commentArticle,
  likeArticle,
  getComments,
  commentsReplies,
  commentsLikes,
  getcommentsReplies
} from '@/apis/article'
import { useLocation } from 'react-router-dom'
import { ArticleDetailBox } from './style'
import { HeartOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Input, Tree, message } from 'antd'
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
      res.data.forEach((item: replies) => {
        delete item.replies
      })
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
        commentId: nowComInfo._id,
        text: value
      }
      commentsReplies(params).then((res) => {
        messageApi.open({
          type: 'success',
          content: res.message
        })
        setValue('')
        onLoadData({ _id: nowComInfo._id })
        // getArt()
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
        // getArt()
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
      setIslike(true)
      setArtInfo({ ...artInfo, likes: [...artInfo.likes, {}] })
      // getArt()
    })
  }

  // 引用回复
  const replySend = (item: any) => {
    setSendCtoC(true)
    setNowComInfo(item)
  }

  // 评论点赞
  const replyLike = (id: string) => {
    commentsLikes(id)
  }

  // 获取内层评论
  // const getInserComments = (id: string) => {
  //   getcommentsReplies(id)
  // }

  const updateTreeData = (list: replies[], _id: React.Key, replies: replies[]): replies[] =>
    list.map((node) => {
      if (node._id === _id) {
        return {
          ...node,
          replies
        }
      }
      if (node.replies) {
        return {
          ...node,
          replies: updateTreeData(node.replies, _id, replies)
        }
      }
      return node
    })

  const onLoadData = ({ _id, replies }: any) =>
    new Promise<void>((resolve) => {
      if (replies) {
        resolve()
        return
      }
      console.log(_id, replies)
      getcommentsReplies(_id).then((res) => {
        res.data.forEach((item: replies) => {
          delete item.replies
        })
        setComments((origin: any) => updateTreeData(origin, _id, res.data))
        resolve()
      })
    })

  const titleRender = (nodeData: replies) => {
    return (
      <div className="commentlist">
        <img src={nodeData.user.avatar} alt="" />
        <span className="ml-5">{nodeData.text}</span>
        <HeartOutlined onClick={() => replyLike(nodeData._id)} className="ml-5" />
        {nodeData.likes}
        <span className="ml-5" onClick={() => replySend(nodeData)}>
          回复
        </span>
      </div>
    )
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
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            titleRender={titleRender}
            fieldNames={{ title: 'text', key: '_id', children: 'replies' }}
            loadData={onLoadData}
            treeData={comments}
          />

          {/* {comments.map((item: any) => (
            <div className="comment-item" key={item._id}>
              <p>
                {item.user.name}： {item.text}
                <span onClick={() => replySend(item)}>回复</span>
                <span onClick={() => replyLike(item._id)}>点赞{item.likes}</span>
                <span onClick={() => getInserComments(item._id)}>获取内层评论</span>
              </p>
            </div>
          ))} */}
        </div>
      </div>
    </ArticleDetailBox>
  )
}
