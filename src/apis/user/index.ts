import request from '@/utils/request'
const prefix = '/api/users'

const API = {
  REGISTER_URL: `${prefix}/register`,
  LOGIN_URL: `${prefix}/login`
}

// export const userLogin = (params:LoginAPIReq):Promise<LoginAPIRes> => request.get(API.LOGIN_URL, { params })

export const userRegister = (data: RegisterApiData): Promise<LoginAPIResponse> =>
  request.post(API.REGISTER_URL, data)

export const userLogin = (data: LoginApiData): Promise<LoginAPIResponse> =>
  request.post(API.LOGIN_URL, data)
