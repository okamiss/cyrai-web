import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { userInfoType, LoginType } from '@/types/user'
// 创建异步操作的 thunk 函数

export const loginUserThunk: any = createAsyncThunk('xxx', async (credentials: LoginApiData) => {
  return credentials
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || ''
  },
  reducers: {
    saveLoginInfo(state, action) {
      state.username = action.payload.username
      state.token = action.payload.token
      state.email = action.payload.email
      localStorage.setItem('username', action.payload.username)
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('email', action.payload.email)
    },
    logout(state) {
      state.username = ''
      state.token = ''
      state.email = ''
      localStorage.clear()
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
