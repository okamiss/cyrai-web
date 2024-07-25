import request from '@/utils/request'
const prefix = '/api/articles'

const API = {
  GET_ARTICLE_URL: `${prefix}`, // 获取全部文章
  SEND_ARTICLE: `${prefix}/add` // 获取全部文章
}

// export const userLogin = (params):Promise<getArticle> => request.get(API.GET_ARTICLE_URL, { params })
export const getArticle = (params:ArtListQuery): Promise<getArticle> => request.get(API.GET_ARTICLE_URL,{params})

export const sendArticle = (data: sendArticle): Promise<sendArticleRes> =>
  request.post(API.SEND_ARTICLE, data)
