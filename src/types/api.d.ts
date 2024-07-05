interface DefaultResponseTemplate {
  status: string
  code: number
  message: string
}

// 用户注册
interface RegisterApiData {
  username: string
  password: string
  email: string
  _id?: string
  date?: string
  __v?: number
}

interface LoginAPIResponse extends DefaultResponseTemplate {
  data: RegisterApiData
}

// 用户登录
interface LoginApiData {
  token?: string
  password: string
  email: string
}

interface LoginAPIResponse extends DefaultResponseTemplate {
  data: LoginApiData
}
