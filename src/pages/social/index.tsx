import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { ContentBox } from './style'
import { Button, Divider, Form, Input, Modal, Pagination, Upload, message } from 'antd'
import {
  FormOutlined,
  InboxOutlined,
  EyeOutlined,
  HeartTwoTone,
  MessageOutlined
} from '@ant-design/icons'
import type { FormProps } from 'antd'
import { getArticle, sendArticle } from '@/apis/article'
const { TextArea } = Input

import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Emoji from '@/components/Emoji'

import type { UploadProps } from 'antd'
import { getFileTypeByMime } from '@/utils/tool'
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
  // const [getFilelist, setGetFilelist] = useState([])

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
      articles.forEach((item) => {
        item.fields.forEach((fs) => {
          fs.fsType = getFileTypeByMime(fs.mimetype)
        })
      })
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
      setFilelist([])
      getDataList()
      handleCancel()
      form.resetFields()
    })
  }

  const props: UploadProps = {
    name: 'artFile',
    multiple: true,
    action: `${import.meta.env.VITE_SERVE}/api/upload`,
    accept: '.jpg,.jpeg,.png,.gif,.mp4',
    headers: {
      Authorization: token
    },
    fileList: filelist,
    onChange({ fileList: newFileList }) {
      console.log(newFileList, 'newFileList')
      setFilelist(newFileList)
    },
    // onChange(info) {
    //   const { status } = info.file
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList)
    //     // setFilelist(info.fileList)
    //   }
    //   if (status === 'done') {
    //     console.log(info);

    //     message.success(`${info.file.name} 上传成功`)
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} 上传失败`)
    //   }
    // },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <ContentBox className="m-1200-auto">
      {contextHolder}
      <div className="box-left">
        <div className="box-left-banner border-box mt-20"></div>
        <div className="box-left-article  mt-20">
          {articleList.map((item) => {
            return (
              <div className="article-item" key={item._id}>
                <div className="article-item-userinfo">
                  <img src={item.author.avatar} alt={item.author.name} />
                  <span>{item.author.name}</span>
                </div>
                <div className="article-item-title over-nobreak">
                  <span onClick={() => navigateTo(`/social/detail/${item._id}`)}>{item.title}</span>
                </div>
                <div
                  className="article-item-content over-nobreak-2"
                  onClick={() => navigateTo(`/social/detail/${item._id}`)}
                >
                  {item.content}
                </div>
                <div
                  className="article-item-fileds mt-5"
                  onClick={() => navigateTo(`/social/detail/${item._id}`)}
                >
                  {item.fields
                    .slice(0, 3)
                    .map((item) =>
                      item.fsType === 'image' ? (
                        <img src={item.path} key={item._id} />
                      ) : (
                        <video src={item.path} key={item._id}></video>
                      )
                    )}
                </div>
                <div className="article-item-interactive mt-8">
                  <span>发布时间：{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  <div className="flexpldz">
                    <span>
                      <EyeOutlined /> &nbsp;
                      {item.totalViews}
                    </span>
                    <span>
                      <HeartTwoTone twoToneColor="#eb2f96" />
                      &nbsp;
                      {item.likes.length}
                    </span>
                    <span>
                      <MessageOutlined />
                      &nbsp;
                      {item.comments.length}
                    </span>
                  </div>
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

          <Form.Item label="图文视频">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或批量上传。</p>
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
