import request from '@/utils/request'
const prefix = '/api/users'

const API = {
  REGISTER_URL: `${prefix}/register`,
  LOGIN_URL: `${prefix}/login`,
  USERINFO: `${prefix}/current`, //用户信息
  PROFILE: `${prefix}/profile`, //修改用户信息
}

// export const userLogin = (params:LoginAPIReq):Promise<LoginAPIRes> => request.get(API.LOGIN_URL, { params })

export const userRegister = (data: RegisterApiData): Promise<LoginAPIResponse> =>
  request.post(API.REGISTER_URL, data)

export const userLogin = (data: LoginApiData): Promise<LoginAPIResponse> =>
  request.post(API.LOGIN_URL, data)

export const getUserInfo = (): Promise<getUserRes> => request.get(API.USERINFO)


export const userEdit = (data: getUser): Promise<LoginAPIResponse> =>
  request.post(API.PROFILE, data)