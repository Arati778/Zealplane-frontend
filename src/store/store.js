import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import projectReducer from "./projectSlice";
import userSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        home: homeSlice,
        projects: projectReducer,
        user: userSlice
    },
});
