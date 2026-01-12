import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ensure this matches your backend URL
const API_URL = 'http://localhost:5000/api/events';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (params = {}) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
});

export const createEvent = createAsyncThunk('events/createEvent', async (eventData) => {
  // Authorization header commented out for basic testing
  const response = await axios.post(API_URL, eventData, {
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  return response.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: { events: [], filteredEvents: [], status: 'idle' },
  reducers: {
    filterEvents: (state, action) => {
      state.filteredEvents = state.events.filter(e =>
        (!action.payload.category || e.category === action.payload.category) &&
        (!action.payload.date || e.date.includes(action.payload.date)) &&
        (!action.payload.location || e.location.includes(action.payload.location))
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Basic implementation to avoid duplicate keys in infinite scroll
        // In a real app, you should manage page numbers in state
        const newEvents = action.payload.filter(
            n => !state.events.some(p => p._id === n._id)
        );
        state.events = [...state.events, ...newEvents];
        state.filteredEvents = state.events;
      });
  }
});

export const { filterEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
