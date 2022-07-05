import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchNewestPosts = createAsyncThunk('posts/fetchNewestPosts', async () => {
   const { data } = await axios.get('/posts');
   return data 
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
   const { data } = await axios.get('/postsPopular');
   return data 
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
   const { data } = await axios.get('/tags');
   return data
})

export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) => {
   axios.delete(`/posts/${id}`);
})
 
const initialState = {
   posts: {
      items: [],
      status: "loading"
   },
   tags: {
      items: [],
      status: "loading"
   }
}

const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {},
   extraReducers: {
      // Получение новых постов
      [fetchNewestPosts.pending]: (state) => {
         state.posts.status = 'loading';
         state.posts.items = [];
      },
      [fetchNewestPosts.fulfilled]: (state, action) => {
         state.posts.status = 'loaded';
         state.posts.items = action.payload;
      },
      [fetchNewestPosts.rejected]: (state) => {
         state.posts.status = 'error';
         state.posts.items = [];
      },
      // Получение популярных постов
      [fetchPopularPosts.pending]: (state) => {
         state.posts.status = 'loading';
         state.posts.items = [];
      },
      [fetchPopularPosts.fulfilled]: (state, action) => {
         state.posts.status = 'loaded';
         state.posts.items = action.payload;
      },
      [fetchPopularPosts.rejected]: (state) => {
         state.posts.status = 'error';
         state.posts.items = [];
      },
      // Получение тегов
      [fetchTags.pending]: (state) => {
         state.tags.status = 'loading';
         state.tags.items = [];
      },
      [fetchTags.fulfilled]: (state, action) => {
         state.tags.status = 'loaded';
         state.tags.items = action.payload;
      },
      [fetchTags.rejected]: (state) => {
         state.tags.status = 'error';
         state.tags.items = [];
      },
      // Удаление поста
      [fetchRemovePosts.pending]: (state, action) => {
         state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
      },

   }
})

export const postsReducer = postsSlice.reducer;