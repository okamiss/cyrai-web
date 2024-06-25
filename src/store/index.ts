import { configureStore } from '@reduxjs/toolkit'
import messageBoardReducer from './reducers/messageBoard'
import userReducer from './reducers/user'

const store = configureStore({
  reducer: {
    messageBoard: messageBoardReducer,
    user: userReducer
  },
  devTools: true
})

export default store
