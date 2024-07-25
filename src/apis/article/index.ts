import request from '@/utils/request'
const prefix = '/api/articles'

const API = {
  GET_ARTICLE: `${prefix}`, // 获取全部文章
  SEND_ARTICLE: `${prefix}/add` // 添加文章
}

export const getArticle = (params: ArtListQuery): Promise<getArticle> =>
  request.get(API.GET_ARTICLE, { params })

export const sendArticle = (data: sendArticle): Promise<sendArticleRes> =>
  request.post(API.SEND_ARTICLE, data)

// 文章详情
export const articleDetail = (params: string): Promise<sendArticleRes> =>
  request.get(`${API.GET_ARTICLE}/${params}`)

// 评论
export const commentArticle = (data: commentArt): Promise<sendArticleRes> =>
  request.post(`${API.GET_ARTICLE}/${data.artId}/comment`, data)

// 点赞
export const likeArticle = (data: string): Promise<sendArticleRes> =>
  request.post(`${API.GET_ARTICLE}/${data}/like`)
