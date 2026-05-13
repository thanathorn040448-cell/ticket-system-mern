import { configureStore } from "@reduxjs/toolkit"
import eventReducer from "./eventSlice"

const store = configureStore({
  reducer: {
    events: eventReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch