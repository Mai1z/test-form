import { createSlice } from '@reduxjs/toolkit';

import { fetchForm } from '../ActionsCreator';

interface FormState {
  data: [],
  loading: boolean,
  status: string,
}

const initialState: FormState = {
  data: [],
  loading: false,
  status: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    clearStatus(state) {
      state.status = '';
    },
    addData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [fetchForm.fulfilled.type]: (state) => {
      state.status = 'success';
      state.loading = false;
    },
    [fetchForm.rejected.type]: (state) => {
      state.status = 'error';
      state.loading = false;
    },
    [fetchForm.pending.type]: (state) => {
      state.loading = true;
    },
  },
});

export default formSlice.reducer;
