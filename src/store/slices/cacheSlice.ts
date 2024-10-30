/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ForecastWeatherType } from '@/types';

export interface HistoryCacheType {
  time: string;
  filter: string;
  data: ForecastWeatherType;
}

export interface ForecastCacheType {
  filter: string;
  data: ForecastWeatherType;
}

export interface CacheType {
  historyCache: HistoryCacheType[];
  forecastCache: ForecastCacheType[];
}

const initialState: CacheType = {
  historyCache: [],
  forecastCache: [],
};

const cacheSlice = createSlice({
  name: 'cache',

  initialState,

  reducers: {
    pushForecastCache: (state, action: PayloadAction<ForecastCacheType>) => {
      // Check if cache exist. If yes, then pop.
      if (
        state.forecastCache.some(
          (fore) => fore.filter === action.payload.filter,
        )
      ) {
        state.forecastCache = state.forecastCache.filter(
          (fore) => fore.filter !== action.payload.filter,
        );
      }

      state.forecastCache.push(action.payload);
    },
  },
});

export const { pushForecastCache } = cacheSlice.actions;

export default cacheSlice.reducer;
