import { configureStore, createSlice } from "@reduxjs/toolkit";
import data_ from "./userData.json";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: data_,  
    message: []  as string[]
  },
  reducers: {
    addData: (state, action) => {
      state.data = action.payload;
    },  
    addMessage: (state, action) => {
      state.message.push(action.payload);  
    }, 
    logout: (state) => {
      state.data = {
        logo_name: "",
        firstName: "",
        secondName: "",
        about: "",
        resume: "",
        project: [],
        experience: [],
        techstack: [],
        social: []
      }; 
      state.message = [];  
      localStorage.removeItem("token");
    }
  }
});

export const { addData, addMessage, logout } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer
  }
});

export default store;
