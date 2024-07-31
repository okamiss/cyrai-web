import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import type { userInfoType, LoginType } from '@/types/user'
// 创建异步操作的 thunk 函数

// export const loginUserThunk: any = createAsyncThunk('xxx', async (credentials: LoginApiData) => {
//   return credentials
// })

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: localStorage.getItem('name') || '',
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
    avatar: localStorage.getItem('avatar') || '',
    userId: localStorage.getItem('userId') || ''
  },
  reducers: {
    saveLoginInfo(state, action) {
      const { name, email, avatar, token, userId } = action.payload
      state.name = name
      state.email = email
      state.avatar = avatar
      state.userId = userId
      state.token = token || state.token

      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
      localStorage.setItem('avatar', avatar)
      localStorage.setItem('userId', userId)
      localStorage.setItem('token', token || state.token)
    },

    logout(state) {
      state.name = ''
      state.email = ''
      state.avatar = ''
      state.userId = ''
      state.token = ''
      localStorage.clear()
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUserThunk.pending, (state) => {})
  //     .addCase(loginUserThunk.fulfilled, (state, action) => {})
  //     .addCase(loginUserThunk.rejected, (state, action) => {})
  // }
})

export const { logout, saveLoginInfo } = userSlice.actions
export default userSlice.reducer
