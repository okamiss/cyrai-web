import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { ContentBox } from './style'
import { Button, Form, Input, Modal, Pagination, Upload, message } from 'antd'
import { FormOutlined, InboxOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
import { getArticle, sendArticle } from '@/apis/article'
const { TextArea } = Input

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Emoji from '@/components/Emoji'

import type { UploadProps } from 'antd'
const { Dragger } = Upload

export default function Home() {
  const navigateTo = useNavigate()
  const name = useSelector((state: RootState) => state.user.name)
  const token = useSelector((state: RootState) => state.user.token)
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [articleList, setArticleList] = useState<getArticleBody[]>([])
  const [total, setTotal] = useState(0)
  const [listQuery, setListQuery] = useState({ page: 1, limit: 10 })
  const [form] = Form.useForm()
  const [cursorPosition, setCursorPosition] = useState(0)
  const [filelist, setFilelist] = useState<any>([])
  const [getFilelist, setGetFilelist] = useState([])

  const handleInputChange = (e: any) => {
    const input = e.target
    setCursorPosition(input.selectionStart)
  }

  const saveQuery = (value: string, key: string) => {
    const getNowVal = form.getFieldValue(key) || ''

    const newValue = getNowVal.slice(0, cursorPosition) + value + getNowVal.slice(cursorPosition)
    form.setFieldValue(key, newValue)
  }

  useEffect(() => {
    getDataList()
  }, [listQuery])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {}

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (page: number, pageSize: number) => {
    console.log(page, pageSize)
    setListQuery({ page, limit: pageSize })
  }

  // 获取文章列表
  const getDataList = () => {
    getArticle(listQuery).then((res) => {
      const { articles, total } = res.data
      setTotal(total)
      setArticleList(articles)
    })
  }

  // 发布文章
  const onFinish: FormProps<sendArticle>['onFinish'] = (values) => {
    const newList: any = []

    filelist.forEach((item: { response: { code: number; data: artFile[] } }) => {
      if (item.response.code === 200) {
        item.response.data.forEach((it2: artFile) => {
          const { filename, mimetype, originalname, path } = it2
          newList.push({
            filename,
            mimetype,
            originalname,
            path
          })
        })
      }
    })

    sendArticle({ ...values, fields: newList }).then((res) => {
      messageApi.open({
        type: 'success',
        content: res.message
      })

      getDataList()
      handleCancel()
      form.resetFields()
    })
  }

  const props: UploadProps = {
    name: 'artFile',
    multiple: true,
    action: `${import.meta.env.VITE_SERVE}/api/upload`,
    headers: {
      Authorization: token
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
        setFilelist(info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`)
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <ContentBox className="m-1200-auto">
      {contextHolder}
      <div className="box-left">
        <div className="box-left-banner border-box mt-20"></div>
        <div className="box-left-article border-box mt-20">
          {articleList.map((item) => {
            return (
              <div className="article-item" key={item._id}>
                <div className="article-item-userinfo border-box">{item.author.name}</div>
                <div className="article-item-title border-box">
                  <span onClick={() => navigateTo(`/social/detail/${item._id}`)}>{item.title}</span>
                </div>
                <div className="article-item-content border-box">{item.content}</div>
                <div className="article-item-interactive border-box">
                  <span>发布时间：{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <span>浏览量：{item.totalViews}</span>
                  <span>点赞：{item.likes.length}</span>
                  <span>评论：{item.comments.length}</span>
                </div>
              </div>
            )
          })}
          <Pagination
            total={total}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="box-right ml-20">
        <div className="box-right-userinfo border-box mt-20">
          <p>欢迎 {name}</p>
          <Button type="primary" shape="round" icon={<FormOutlined />} onClick={showModal}>
            发布帖子
          </Button>
        </div>
      </div>
      <Modal
        title="发布帖子"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          name="sendartform"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<sendArticle>
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题！' }]}
          >
            <Input
              onChange={(e) => handleInputChange(e)}
              onClick={(e) => handleInputChange(e)}
              suffix={<Emoji onEmoji={(e: string) => saveQuery(e, 'title')} />}
            />
          </Form.Item>
          <Form.Item<sendArticle>
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容！' }]}
          >
            <TextArea
              autoSize={{ minRows: 5, maxRows: 10 }}
              onChange={(e) => handleInputChange(e)}
              onClick={(e) => handleInputChange(e)}
            />
          </Form.Item>
          {/* <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Emoji onEmoji={(e: string) => saveQuery(e, 'content')} />
          </Form.Item> */}

          <Form.Item<sendArticle> label="图文视频">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data
                or other banned files.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ContentBox>
  )
}
