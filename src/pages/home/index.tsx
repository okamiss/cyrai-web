import React, { Fragment } from 'react'

import { BannerBox, ListBox } from './style'

export default function Home() {
  return (
    <Fragment>
      <BannerBox className="border-box"></BannerBox>
      <ListBox className='mt-20'>
        <div className="list-left border-box"></div>
        <div className="list-right border-box"></div>
      </ListBox>
    </Fragment>
  )
}
