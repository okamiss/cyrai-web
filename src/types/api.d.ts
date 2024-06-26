interface defaultResponse {
  status: string
  code: number
  message: string
}

interface LoginAPIReq {
  username: string
  password: string
  email: string
}

interface Data extends LoginAPIReq {
  _id: string
  date: string
  __v: string
}

interface LoginAPIRes extends defaultResponse {
  data: Data
}
