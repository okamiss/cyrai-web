import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
// import type { userInfoType, LoginType } from '@/types/user'
import { userLogin } from '@/apis/user'
// 创建异步操作的 thunk 函数

export const loginUserThunk: any = createAsyncThunk('login', async (credentials: LoginApiData) => {
  console.log(credentials, 'pppppppppppppppppp')

  const res = await userLogin(credentials)

  

  return res.data
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || ''
  },
  reducers: {
    logout(state) {
      state.username = ''
      state.token = ''
      localStorage.clear()
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {})
      .addCase(loginUserThunk.fulfilled, (state, action) => {
 
        state.username = action.payload.username
        state.token = action.payload.token
        localStorage.setItem('username', action.payload.username)
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUserThunk.rejected, (state, action) => {})
  }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
