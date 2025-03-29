import { configureStore, createSlice } from "@reduxjs/toolkit";
import data_ from "./userData.json";

// Create a Redux slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: data_,  
    message: []  
  },
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },  
    addMessage: (state, action) => {
      state.message.push(action.payload);  
    }, 
    logout: (state) => {
      state.data = {};  
      state.message = [];  
      localStorage.removeItem("token"); 
    },
  }
});

// Export all actions
export const { addData, addMessage, logout } = dataSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

export default store;
