import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  
  value1:"a",
  value2: "b"
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions

export default counterSlice.reducer