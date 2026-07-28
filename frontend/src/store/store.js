import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import searchReducer from "./searchSlice";
import loaderReducer from "./loaderSlice";

const store = configureStore({

  reducer: {

    auth: authReducer,

    search: searchReducer,

    loader: loaderReducer,

  },

});

export default store;
