import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { announcementApiSlice } from "./features/announcementApiSlice";
import { quizApiSlice } from "./features/quizApiSlice";
import { questionApiSlice } from "./features/questionApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [announcementApiSlice.reducerPath]: announcementApiSlice.reducer,
    [quizApiSlice.reducerPath]: quizApiSlice.reducer,
    [questionApiSlice.reducerPath]: questionApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      announcementApiSlice.middleware,
      quizApiSlice.middleware,
      questionApiSlice.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
