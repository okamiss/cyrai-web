import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Button, message } from 'antd'

// import type { userInfoType, LoginType } from '@/types/user'
// 创建异步操作的 thunk 函数

export const loginUserThunk: any = createAsyncThunk('xxx', async (credentials: LoginApiData) => {
  return credentials
})

const initialState = {
  name: localStorage.getItem('name') || '',
  token: localStorage.getItem('token') || '',
  email: localStorage.getItem('email') || '',
  avatar: localStorage.getItem('avatar') || ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveLoginInfo(state, action) {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatar = action.payload.avatar
      state.token = action.payload.token || state.token

      localStorage.setItem('name', action.payload.name)
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('avatar', action.payload.avatar)
      localStorage.setItem('token', action.payload.token || state.token)
    },

    logout() {
      message.success('退出成功')

      localStorage.clear()
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {})
      .addCase(loginUserThunk.fulfilled, (state, action) => {})
      .addCase(loginUserThunk.rejected, (state, action) => {})
  }
})

export const { logout, saveLoginInfo } = userSlice.actions
export default userSlice.reducer
