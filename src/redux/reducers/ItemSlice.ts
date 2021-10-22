import { createSlice } from '@reduxjs/toolkit';

import { fetchItems } from '../ActionsCreator';

interface Items {
  desktop: string,
  mobile: string,
}

interface ItemState {
  items: Items[]
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItems.fulfilled.type]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default itemSlice.reducer;
