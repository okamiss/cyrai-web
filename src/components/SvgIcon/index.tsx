import 'virtual:svg-icons-register'

const SvgIcon = ({ name, width = '24px', height = '24px', color = 'currentColor' }: svgType) => {
  return (
    <svg style={{ width, height }}>
      <use xlinkHref={`#icon-${name}`} fill={color} />
    </svg>
  )
}

export default SvgIcon

{
  /*
使用方法
import SvgIcon from '@/components/SvgIcon'
<SvgIcon name="viewLook" width="48px" height="48px" />
*/
}
