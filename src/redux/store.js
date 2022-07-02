import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/auth";
import { postsReducer } from "./slices/posts";

const store = configureStore({
   reducer: {
      posts: postsReducer,
      auth: userReducer
   }
})

export default store;