import { configureStore } from '@reduxjs/toolkit';

import cacheReducer from './slices/cacheSlice';

const store = configureStore({
  reducer: {
    cache: cacheReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
