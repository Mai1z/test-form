import { combineReducers, configureStore } from '@reduxjs/toolkit';

import itemReducer from './reducers/ItemSlice';
import formReducer from './reducers/FormSlice';

const rootReducer = combineReducers({
  itemReducer,
  formReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof setupStore.getState>;
