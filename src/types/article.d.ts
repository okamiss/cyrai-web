interface ArtListQuery {
  page: number
  limit: number
}

interface commentArt {
  artId: string
  text: string
}
interface sendArticle {
  title: string
  content: string
  author?: string
  fields?: artFile[]
}

interface artFile {
  createdAt: string
  filename: string
  mimetype: string
  originalname: string
  path: string
}

interface getArticle extends DefaultResponseTemplate {
  data: getArtData
}

interface getArtData {
  articles: getArticleBody[]
  page: number
  pages: number
  total: number
}

interface sendArticleRes extends DefaultResponseTemplate {
  data: getArticleBody
}

interface getArticleBody {
  _id: string
  title: string
  content: string
  author: Author
  likes: any[]
  createdAt: string
  comments: any[]
  __v?: number
  totalViews: number
  fields: any[]
}

interface Author {
  _id: string
  name: string
  avatar: string
}

interface replies {
  user: repliesUser
  _id: string
  isLeaf: boolean
  text: string
  replies?: replies[]
  likes: number
  createdAt: string
  __v: number
  page?:number
}

interface repliesUser {
  id: string
  name: string
  avatar: string
}
