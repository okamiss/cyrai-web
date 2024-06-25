import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { message } from 'antd'

const messageBoardSlice = createSlice({
  name: 'messageBoard',
  initialState: {
    dataList: JSON.parse(localStorage.getItem('messageBoard') || '[]') as messageBoardData[]
  },

  reducers: {
    add(state, action: PayloadAction<messageBoardData>) {
      const getVal: messageBoardData[] = JSON.parse(localStorage.getItem('messageBoard') || '[]')
      const setVal: messageBoardData[] = [...getVal, action.payload]

      state.dataList = setVal
      localStorage.setItem('messageBoard', JSON.stringify(setVal))
    },
    del(state, action: PayloadAction<messageBoardData>) {
      const getVal: messageBoardData[] = JSON.parse(localStorage.getItem('messageBoard') || '[]')
      const setVal: messageBoardData[] = getVal.filter((item) => item.id !== action.payload.id)

      state.dataList = setVal
      localStorage.setItem('messageBoard', JSON.stringify(setVal))
      message.success('删除成功')
    },

    agree(state, action: PayloadAction<messageBoardData>) {
      // console.log(action.payload, 'payloadpayload')
      const getVal: messageBoardData[] = JSON.parse(localStorage.getItem('messageBoard') || '[]')
      const getArgeeIndex = getVal.findIndex((item) => item.id === action.payload.id)
      getVal[getArgeeIndex].agree += 1

      state.dataList = getVal
      localStorage.setItem('messageBoard', JSON.stringify(getVal))
    }
  }
})

export const { add, del, agree } = messageBoardSlice.actions
export default messageBoardSlice.reducer
