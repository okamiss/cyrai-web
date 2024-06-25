import styled from 'styled-components'

export const Box = styled.div`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.1);
  width: 500px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 100;
  // 控制表单元素
  .ant-input,
  .ant-input-password {
    background-color: rgba(255, 255, 255, 0);
    border-color: #35d4c7;
    color: #fff;
    height: 38px;
  }
  // placeholder字体颜色的控制
  .ant-input::-webkit-input-placeholder {
    color: #35d4c7;
  }
  // 单独控制密码盒子的高度
  .ant-input-password .ant-input {
    height: 28px;
  }
  // 控制眼睛图标
  .ant-input-password-icon.anticon,
  .ant-input-password-icon.anticon:hover {
    color: #35d4c7;
  }
`
