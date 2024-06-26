import request from '@/utils/request'
const prefix = '/api'

const API = {
  LOGIN_URL: `${prefix}/users`
}

// export const userLogin = (params:LoginAPIReq):Promise<LoginAPIRes> => request.get(API.LOGIN_URL, { params })

export const userLogin = (data: LoginAPIReq): Promise<LoginAPIRes> =>
  request.post(API.LOGIN_URL, data)
