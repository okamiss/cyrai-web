import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  background-color: var(--primary-color);
  color: #fff;
  height: 100px;
  position: fixed;
  top: 0;
  z-index: 999;
  .content {
    width: var(--container-width);
    margin: 0 auto;
    .select-list {
      line-height: 100px;
      .right {
        float: right !important;
      }
      .select-item {
        float: left;
        position: relative;
        a,
        span {
          display: block;
          padding: 0 30px;
          color: #ccc;
          font-size: 16px;
          text-decoration: none;
          cursor: pointer;
        }
        &:hover a,
        a.active {
          color: #75e6db;
          /* background: rgba(255, 255, 255, 0.5); */
        }
      }
    }
  }
`
