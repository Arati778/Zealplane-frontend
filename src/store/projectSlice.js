import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await axios.get('http://localhost:3000/projects');
    // return response.data;
    console.log(response);
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
