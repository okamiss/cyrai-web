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
          overflow: hidden; /*内容超出后隐藏*/
          text-overflow: ellipsis; /*超出内容显示为省略号*/
          white-space: nowrap; /*文本不进行换行*/
          border-bottom: 1px dashed #ccc;
          cursor: pointer;
        }
        &-content {
          /* height: 160px;
          overflow-y: scroll; */
          font-size: 16px;
          line-height: 25px;
          overflow: hidden; /*内容超出后隐藏*/
          text-overflow: ellipsis; /*超出内容显示为省略号*/
          display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
          -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
          -webkit-line-clamp: 2; /*这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。可根据需要设置超出多少行后显示省略号*/
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
          .flexpldz{
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
