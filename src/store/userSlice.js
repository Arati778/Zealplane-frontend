import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Set the userId
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setUserId,setUser } = userSlice.actions;

export default userSlice.reducer;
