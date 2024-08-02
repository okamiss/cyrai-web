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
import { Alert, Button, Input, Tree, message } from 'antd'
import { getFileTypeByMime, timeCalc } from '@/utils/tool'
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
  // const [articleid, setArticleid] = useState('')
  // const [pages, setPages] = useState(1)
  // const [isBottom, setIsBottom] = useState(false)

  const getUserId = useSelector((state: RootState) => state.user.userId)
  // const scrollRef = useRef(null)

  useEffect(() => {
    getArt('')
  }, [])

  // useEffect(() => {
  //   const scrollElement: any = scrollRef.current
  //   scrollElement.addEventListener('scroll', handleScroll)
  //   return () => {
  //     scrollElement.removeEventListener('scroll', handleScroll)
  //   }
  // }, [pages, articleid, isBottom])

  // const handleScroll = () => {
  //   const { scrollTop, scrollHeight, clientHeight }: any = scrollRef.current
  //   if (scrollTop + clientHeight >= scrollHeight) {
  //     // console.log('评论区滚动到底部')
  //     // console.log(isBottom, 'isBottom')
  //     if (isBottom) return
  //     setPages((value) => value + 1)
  //     getCommentList(articleid, pages + 1)
  //   }
  // }

  // 加载评论列表
  const getCommentList = () => {
    getComments({ id: artId }).then((res) => {
      res.data.forEach((item: replies) => {
        // item.page = 1
        delete item.replies
      })

      setComments(res.data)
      // if (res.data.length < 10) {
      //   setIsBottom(true)
      // } else {
      //   setIsBottom(false)
      // }
      // setComments((value: any) => [...value, ...res.data])
    })
  }

  // 文章详情
  const getArt = (e: string) => {
    articleDetail(artId).then((res) => {
      res.data.fields.forEach((fs) => {
        fs.fsType = getFileTypeByMime(fs.mimetype)
      })
      const isLike = res.data.likes.some((item) => item.id === getUserId)

      setIslike(isLike)
      setArtInfo(res.data)
      if (e === 'like') return
      // setArticleid(res.data._id)
      getCommentList()
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
      // 引用评论
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
        setSendCtoC(false)
        setNowComInfo({})
        // onLoadData({ _id: nowComInfo._id })
        // 静态添加数据
        const updateTree = (data: any) =>
          data.map((item: any) => {
            if (item._id === nowComInfo._id) {
              if (item.replies) {
                return {
                  ...item,
                  isLeaf: false,
                  replies: [...item.replies, res.data]
                }
              } else {
                return {
                  ...item,
                  isLeaf: false
                }
              }
            }
            if (item.replies) {
              return { ...item, replies: updateTree(item.replies) }
            }
            return item
          })

        setComments(updateTree(comments))
      })
    } else {
      // 外层评论
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
        setComments((value: any) => [...value, res.data])
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
      getArt('like')
    })
  }

  // 引用回复
  const replySend = (item: any) => {
    setSendCtoC(true)
    setNowComInfo(item)
  }

  // 评论点赞
  const replyLike = (rows: any) => {
    commentsLikes(rows._id).then(() => {
      // 静态添加数据
      const updateTree = (data: any) => {
        return data.map((item: any) => {
          if (item._id === rows._id) {
            return { ...item, likes: item.likes + 1 }
          }
          if (item.replies) {
            return { ...item, replies: updateTree(item.replies) }
          }
          return item
        })
      }
      setComments(updateTree(comments))
    })
  }

  // 加载更多
  // const getCommentMore = (item: any) => {

  // }

  // 获取内层评论
  // const getInserComments = (id: string) => {
  //   getcommentsReplies(id)
  // }

  const updateTreeData = (list: replies[], _id: React.Key, replies: replies[]): replies[] =>
    list.map((node) => {
      if (node._id === _id) {
        return {
          ...node,
          isLeaf: !replies.length,
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
      getcommentsReplies(_id).then((res) => {
        res.data.forEach((item: replies) => {
          // item.page = 1
          delete item.replies
        })
        setComments((origin: any) => updateTreeData(origin, _id, res.data))
        resolve()
      })
    })

  const titleRender = (nodeData: replies) => {
    return (
      <div className="commentlist">
        <div className="upinfo">
          <img className="upinfo-left" src={nodeData.user.avatar} alt="" />
          <div className="upinfo-right ml-5">
            <p>{nodeData.user.name}</p>
            <p>{nodeData.text}</p>
          </div>
        </div>
        <div className="dninfo">
          <div className="dninfo-left">
            {timeCalc(nodeData.createdAt)}
            <span className="ml-5">●</span>
            <span className="ml-5 hf" onClick={() => replySend(nodeData)}>
              回复
            </span>
          </div>
          <div className="dninfo-right ml-10" onClick={() => replyLike(nodeData)}>
            <HeartOutlined className="ml-5" />
            <span className="ml-3">{nodeData.likes}</span>
            {/* <span className="ml-10" onClick={() => getCommentMore(nodeData)}>
              加载更多
            </span> */}
          </div>
        </div>
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
      <div className="art-right ml-10 ">
        <div className="author">
          <img src={artInfo.author.avatar} alt={artInfo.author.name} />
          <span className="ml-5">{artInfo.author.name}</span>
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
        </div>
        <div className="comment">
          <div className="comment-tit">发表评论</div>

          {sendCtoC ? (
            <Alert
              message={`正在回复：${nowComInfo.user.name}`}
              description={nowComInfo.text}
              type="info"
              closable
              onClose={() => {
                setSendCtoC(false)
                setNowComInfo({})
              }}
            />
          ) : null}

          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{ minRows: 5, maxRows: 10 }}
          />

          <Button type="primary" onClick={sendComment} className="comment-sendpl">
            发表评论
          </Button>

          <Tree
            height={500}
            selectable={false}
            showLine
            switcherIcon={<DownOutlined />}
            titleRender={titleRender}
            fieldNames={{ title: 'text', key: '_id', children: 'replies' }}
            loadData={onLoadData}
            treeData={comments}
          />
        </div>
      </div>
    </ArticleDetailBox>
  )
}
