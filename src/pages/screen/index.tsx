import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import type { Container, Engine } from 'tsparticles-engine'
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from 'tsparticles-slim' // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import initLoginBg from './initbg'

import {Box} from './style'

export default function index() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  //粒子被正确加载到画布中时，这个函数被调用
  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container, 'container')
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={initLoginBg as any}
      />
      <Box>
        Hello welcome to Cyr AI!
      </Box>
    </div>
  )
}
