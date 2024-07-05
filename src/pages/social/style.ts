import styled from 'styled-components'

export const ContentBox = styled.div`
  width: var(--container-width);
  margin: 0 auto;
  display: flex;
  .box-left {
    width: 800px;
    &-banner{
      width: 100%;
      height: 400px;
    }
    &-article{
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .article-item{
        height: 300px;
        &-userinfo{
          height: 40px;
        }
        &-title{
          height: 30px;
          line-height: 30px;
          font-weight: bold;
        }
        &-content{
          height: 160px;
        }
        &-interactive{
          height: 20px;
        }
      }
    }
  }
  .box-right{
    flex: 1;
    &-userinfo{
      width: 100%;
      height: 400px;
    }
  }
`
