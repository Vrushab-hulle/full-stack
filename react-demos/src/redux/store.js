import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counterSlice.jsx'

export const store = configureStore({
  reducer: {
    counter:counterReducer
  },
})