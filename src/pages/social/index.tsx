import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { ContentBox } from './style'
import { Button, ConfigProvider, Form, Input, Modal, Pagination, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
import { getArticle, sendArticle } from '@/apis/article'
const { TextArea } = Input

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const name = useSelector((state: RootState) => state.user.name)
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [articleList, setArticleList] = useState<getArticleBody[]>([])
  const [total, setTotal] = useState(0)
  const [listQuery, setListQuery] = useState({ page: 1, limit: 10 })

  const navigateTo = useNavigate()

  useEffect(() => {
    getDataList()
  }, [listQuery])

  const [form] = Form.useForm()

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
    console.log(values)
    sendArticle(values).then((res) => {
      messageApi.open({
        type: 'success',
        content: res.message
      })
      getDataList()
      handleCancel()
      form.resetFields()
    })
  }

  return (
    <ContentBox className='m-1200-auto'>
      {contextHolder}
      <div className="box-left">
        <div className="box-left-banner border mt-20"></div>
        <div className="box-left-article border mt-20">
          {articleList.map((item) => {
            return (
              <div className="article-item" key={item._id}>
                <div className="article-item-userinfo border">{item.author.name}</div>
                <div className="article-item-title border">
                  <span onClick={() => navigateTo(`/social/detail/${item._id}`)}>{item.title}</span>
                </div>
                <div className="article-item-content border">{item.content}</div>
                <div className="article-item-interactive border">
                  <span>发布时间：{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
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
        <div className="box-right-userinfo border mt-20">
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
            <Input />
          </Form.Item>
          <Form.Item<sendArticle>
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容！' }]}
          >
            <TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ContentBox>
  )
}
