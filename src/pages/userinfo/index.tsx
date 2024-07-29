import React, { useContext, useEffect, useState } from 'react'
import { UserinfoBox } from './style'
import { getUserInfo, userEdit } from '@/apis/user'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, message, Upload } from 'antd'
import type { GetProp, UploadProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import ImgCrop from 'antd-img-crop'

// import { userContext } from '@/layout'
import { saveLoginInfo } from '@/store/reducers/user'

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
  // const getUserContext = useContext(userContext)
  const dispatch = useDispatch()
  const [userinfo, setUserinfo] = useState<getUser>({
    name: '',
    email: '',
    avatar: ''
  })
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    getInfoList()
  }, [])

  const getInfoList = () => {
    getUserInfo().then((res) => {
      setUserinfo(res.data)
      setImageUrl(`${import.meta.env.VITE_SERVE}/${res.data.avatar}`)
      dispatch(saveLoginInfo(res.data))
    })
  }

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
      const { code, data } = info.file.response
      console.log(code, data)
      setUserinfo({ ...userinfo, avatar: data[0].filename })
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const token = useSelector((state: RootState) => state.user.token)

  const submit = () => {
    console.log(userinfo)
    userEdit(userinfo).then(() => {
      message.success('修改成功')
      getInfoList()
    })
  }

  return (
    <UserinfoBox className="m-1200-auto">
      <p>用户名：{userinfo.name}</p>
      <p>邮箱：{userinfo.email}</p>
      <ImgCrop rotationSlider>
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
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>

      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </UserinfoBox>
  )
}
