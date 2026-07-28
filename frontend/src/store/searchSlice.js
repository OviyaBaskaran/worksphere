import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  employeeSearch: "",

};

const searchSlice = createSlice({

  name: "search",

  initialState,

  reducers: {

    setEmployeeSearch: (state, action) => {

      state.employeeSearch = action.payload;

    },

    clearEmployeeSearch: (state) => {

      state.employeeSearch = "";

    },

  },

});

export const {

  setEmployeeSearch,

  clearEmployeeSearch,

} = searchSlice.actions;

export default searchSlice.reducer;