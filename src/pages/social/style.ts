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
        /* height: 300px; */
        padding: 30px 0;
        border-bottom: 1px solid #ccc;
        &-userinfo {
          height: 40px;
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
          span {
            margin-left: 5px;
          }
        }
        &-title {
          height: 30px;
          line-height: 30px;
          font-weight: bold;
          border-bottom: 1px dashed #ccc;
          cursor: pointer;
        }
        &-content {
          /* height: 160px;
          overflow-y: scroll; */
          font-size: 16px;
          line-height: 25px;
          cursor: pointer;
        }
        &-fileds {
          cursor: pointer;
          /* height: 100px; */
          img,
          video {
            width: 100px;
            height: 100px;
            margin-right: 10px;
          }
        }
        &-interactive {
          height: 20px;
          display: flex;
          justify-content: space-between;
          .flexpldz {
            width: 150px;
            display: flex;
            justify-content: space-between;
          }
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
  display: flex;
  padding-top: 50px;
  .art-left {
    width: 50%;
    .artSwiper {
      height: 100%;
      img,
      video {
        width: 100%;
      }
    }
  }
  .art-right {
    flex: 1;
    .author {
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px dashed #ccc;
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    .title {
      line-height: 30px;
      font-size: 20px;
      font-weight: bold;
    }
    .desc {
      line-height: 25px;
    }
    .respond{
      display: flex;
      justify-content: center;
      span{
        display: flex;
        align-items: center;
        margin: 0 10px;
        cursor: pointer;
        svg{
          margin-right: 5px;
        }
      }
    }
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
