import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { userInfoType, LoginType } from '@/types/user'
// 创建异步操作的 thunk 函数

export const loginUserThunk: any = createAsyncThunk('xxx', async (credentials: LoginApiData) => {
  return credentials
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: localStorage.getItem('name') || '',
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || ''
  },
  reducers: {
    saveLoginInfo(state, action) {
      state.name = action.payload.name
      state.token = action.payload.token
      state.email = action.payload.email
      localStorage.setItem('name', action.payload.name)
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('email', action.payload.email)
    },
    logout(state) {
      state.name = ''
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
