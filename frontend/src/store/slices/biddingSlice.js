import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import io from 'socket.io-client';

let socket;

export const initializeSocket = () => (dispatch) => {
  socket = io();

  socket.on('bidUpdate', (bid) => {
    dispatch(updateBid(bid));
  });

  socket.on('error', (error) => {
    dispatch(setBiddingError(error));
  });
};

export const placeBid = createAsyncThunk('bidding/placeBid', async ({ productId, amount }) => {
  const response = await axios.post(`/api/bids/${productId}`, { amount });
  socket.emit('newBid', { productId, amount });
  return response.data;
});

export const fetchBidHistory = createAsyncThunk('bidding/fetchHistory', async (productId) => {
  const response = await axios.get(`/api/bids/${productId}/history`);
  return response.data;
});

const biddingSlice = createSlice({
  name: 'bidding',
  initialState: {
    currentBid: null,
    bidHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateBid: (state, action) => {
      state.currentBid = action.payload;
      state.bidHistory.unshift(action.payload);
    },
    setBiddingError: (state, action) => {
      state.error = action.payload;
    },
    clearBiddingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBid = action.payload;
        state.bidHistory.unshift(action.payload);
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBidHistory.fulfilled, (state, action) => {
        state.bidHistory = action.payload;
      });
  },
});

export const { updateBid, setBiddingError, clearBiddingError } = biddingSlice.actions;
export default biddingSlice.reducer;