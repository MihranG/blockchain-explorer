import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseData } from '../types/Interfaces';
import { fetchBlock } from './thunks';

interface IBlockSliceData {
  data: IResponseData;
  loading: boolean;
  errorMessage: string;
}

const initialState: IBlockSliceData = {
  data: {
    jsonrpc: '',
    id: -1,
    result: null,
  },
  loading: false,
  errorMessage: '',
};

const blockSlice = createSlice({
  name: 'blockData',
  initialState,
  reducers: {
    setBLockData(state, action: PayloadAction<IResponseData>) {
      state.data = action.payload;
      state.loading = false;
    },
    removeBlockData(state) {
      state = initialState;
    },
    removeErrors(state) {
      state.errorMessage = '';
    },
    resetApp(state) {
      state.errorMessage = '';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlock.pending, (state) => {
      state.loading = true;
      state.errorMessage = '';
    });
    builder.addCase(fetchBlock.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchBlock.fulfilled, (state, action) => {
      const { payload } = action;
      const { data, errorMessage } = payload;
      if (payload) {
        if (data) {
          if (data.result) {
            const transactions = data.result.transactions.slice(0).reverse();
            const result = { ...data.result, transactions };
            state.data = { ...data, result };
          } else {
            state.data = data;
          }
        }
        state.errorMessage = errorMessage;
      }
      state.loading = false;
    });
  },
});

export const {
  actions: { resetApp, removeErrors, removeBlockData },
} = blockSlice;

export default blockSlice;
