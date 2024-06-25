import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  background-color: var(--primary-color);
  color: #fff;
height: 100px;
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
          font-size: 20px;
          text-decoration: none;
          cursor: pointer;
        }
        &:hover a,
        a.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
`
