import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { ContentBox } from './style'
import { Button, ConfigProvider, Form, Input, Modal, message } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
const { TextArea } = Input

export default function Home() {
  const username = useSelector((state: RootState) => state.user.username)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // 登录
  const onFinish: FormProps<sendArticle>['onFinish'] = (values) => {
    console.log(values)
  }

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
        <div className="box-right-userinfo border mt-20">
          <p>欢迎 {username}</p>
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
          name="basic"
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
