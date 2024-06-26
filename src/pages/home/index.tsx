import React, { Fragment } from 'react'

import { BannerBox, ListBox } from './style'

export default function Home() {
  return (
    <Fragment>
      <BannerBox className="border"></BannerBox>
      <ListBox className='mt-20'>
        <div className="list-left border"></div>
        <div className="list-right border"></div>
      </ListBox>
    </Fragment>
  )
}
