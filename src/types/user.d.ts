// 用户注册
interface RegisterApiData {
  name: string
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

interface userInfoType {
  id: number | string
  name: string
  password: string
  token: string
}

interface LoginType {
  name?: string
  password?: string
  remember?: string
}

interface getUser extends Omit<userInfoType, 'password' | 'token'> {}

interface getUserRes extends DefaultResponseTemplate {
  data: getUser
}