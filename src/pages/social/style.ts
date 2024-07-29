import styled from 'styled-components'

export const ContentBox = styled.div`
  display: flex;
  .box-left {
    width: 800px;
    &-banner {
      width: 100%;
      height: 400px;
    }
    &-article {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .article-item {
        height: 300px;
        &-userinfo {
          height: 40px;
          line-height: 40px;
        }
        &-title {
          height: 30px;
          line-height: 30px;
          font-weight: bold;
        }
        &-content {
          height: 160px;
          overflow-y: scroll;
          line-height: 25px;
        }
        &-interactive {
          height: 20px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .box-right {
    flex: 1;
   
    &-userinfo {
      width: 100%;
      height: 400px;
    }
  }
`

export const ArticleDetailBox = styled.div`
  .title {
    text-align: center;
    line-height: 100px;
  }
  .desc {
    text-align: center;
    line-height: 50px;
  }
  .content {
    line-height: 25px;
  }
  .like {
    display: flex;
    justify-content: center;
    font-size: 30px;

    span {
      cursor: pointer;
    }
    i {
      margin-left: 5px;
    }
  }
  .comment {
    margin-top: 30px;
    border-top: 1px solid #ccc;
    &-tit {
      margin-top: 10px;
    }
    &-item {
      margin-top: 10px;
      p {
        line-height: 30px;
      }
    }
  }
`
