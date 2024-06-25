import { useState } from 'react'
import { Popover } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export default function Emoji(props: { onEmoji: Function }) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const sendEmoji = (e: any) => {
    props.onEmoji(e.native)
    setOpen(false)
  }

  return (
    <>
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
        content={<Picker data={data} onEmojiSelect={(e: any) => sendEmoji(e)} />}
        trigger="click"
      >
        <SmileOutlined style={{ fontSize: '26px', color: '#08c', marginRight: '10px' }} />
      </Popover>
    </>
  )
}
