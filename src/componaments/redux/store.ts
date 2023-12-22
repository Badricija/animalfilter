import { configureStore } from '@reduxjs/toolkit';
import {catReducer} from './catReducer';
export const store = configureStore({
    reducer: {
      cats: catReducer,
    },
  });
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
export default store;
