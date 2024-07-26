import React, { useEffect, useState } from 'react'
import { UserinfoBox } from './style'
import { getUserInfo } from '@/apis/user'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import { useSelector } from 'react-redux'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

export default function Userinfo() {
  const [userinfo, setUserinfo] = useState<getUser>({
    id: '',
    name: ''
  })

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const token = useSelector((state: RootState) => state.user.token)

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserinfo(res.data)
    })
  }, [])

  return (
    <UserinfoBox className="m-1200-auto">
      <p>ID：{userinfo.id}</p>
      <p>用户名：{userinfo.name}</p>
      <Upload
        name="file"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="http://127.0.0.1:5000/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{
          Authorization: token
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </UserinfoBox>
  )
}
