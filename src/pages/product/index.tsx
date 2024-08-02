// import Swiper core and required modules
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './index.module.scss'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

export default () => {
  const productList = [
    {
      id: 1,
      name: 'douyin',
      description: 'douyin集团是cyr旗下的产品，全球40亿用户，每天活跃10亿，全球最大的社交平台',
      icon: 'http://localhost:5000/uploads/2024/08/02/artFile-1722576929312.jpg'
    },
    {
      id: 2,
      name: 'twitter',
      description:
        'twitterdouyin集团是cyr旗下的产品，全球40亿用户，每天活跃10亿，全球最大的社交平台',
      icon: 'http://localhost:5000/uploads/2024/08/02/artFile-1722576929313.jpeg'
    },
    {
      id: 3,
      name: 'qita',
      description: 'douyin集团是cyr旗下的产品，全球40亿用户，每天活跃10亿，全球最大的社交平台',
      icon: 'http://localhost:5000/uploads/2024/08/02/artFile-1722576929314.jpeg'
    }
  ]

  return (
    <Swiper
      className={style.box}
      direction="vertical"
      modules={[Pagination]}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return `<img class="${className} ${style.imgs}" src="${productList[index].icon}" />`
        }
      }}
      spaceBetween={50}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {productList.map((item) => (
        <SwiperSlide key={item.id}>
          <div className={style.name}>{item.name}</div>
          <div className={style.desc}>{item.description}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
