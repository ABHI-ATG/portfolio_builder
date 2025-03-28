import { configureStore, createSlice } from "@reduxjs/toolkit"
import data_ from "./userData.json"

// Sample large dataset


// Create a Redux slice
const dataSlice = createSlice({
  name: "data",
  initialState:{
    data: data_
  },
  reducers: {
    addData: (state, action) => {
      state.data = { ...action.payload };
    },  
    logout: (state, action) => {
      state.data={};
      localStorage.removeItem("token");
    },
  }
});

export const { addData,logout } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

export default store;
