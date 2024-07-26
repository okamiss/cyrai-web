import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { userInfoType, LoginType } from '@/types/user'
// 创建异步操作的 thunk 函数

export const loginUserThunk: any = createAsyncThunk('xxx', async (credentials: LoginApiData) => {
  return credentials
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: localStorage.getItem('token') || ''
  },
  reducers: {
    saveLoginInfo(state, action) {
      state.token = action.payload.token

      localStorage.setItem('token', action.payload.token)
    },
    logout(state) {
      state.token = ''
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
