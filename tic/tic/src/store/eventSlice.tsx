import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { type RootState } from "./index"

export interface EventType {
  _id: string
  eventname: string
  images: string
  artist: string
  location: string
  date: string
}

interface EventState {
  events: EventType[]
  loading: boolean
  error: string | null
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null
}

const API_URL = "http://localhost:3000/events"

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get<EventType[]>(API_URL)
  return response.data
})

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<EventType[]>) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error"
      })
  }
})

export default eventSlice.reducer

export const selectEvents = (state: RootState) => state.events.events
export const selectLoading = (state: RootState) => state.events.loading
export const selectError = (state: RootState) => state.events.error