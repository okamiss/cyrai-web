import React, { Fragment } from 'react'

import { Section } from './style'


const colors = ['#34495e','#1abc9c','#2ecc71','#3498db','#9b59b6','#e67e22']

export default function Home() {
  return (
    <Fragment>
      {colors.map((e) => (
        <Section key={e} style={{background:e}}></Section>
      ))}
    </Fragment>
  )
}
