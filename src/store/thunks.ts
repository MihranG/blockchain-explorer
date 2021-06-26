import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataProvider } from '../api/dataProvider';
import { IResponseData } from '../types/Interfaces';
import { hexNumberObjectManipulation } from '../utils/exceptions';

export const fetchBlock = createAsyncThunk<
  { data: IResponseData | null; errorMessage: '' },
  string
>('block/fetchBlock', async (id: string) => {
  try {
    const initialResult = await dataProvider.getBlockData<{
      data: IResponseData;
    }>(id);
    if (initialResult?.data?.result) {
      const result = hexNumberObjectManipulation(initialResult.data.result);
      return {
        data: { ...initialResult.data, result },
        errorMessage: '',
      };
    } else {
      return { errorMessage: 'Please try again', data: null };
    }
  } catch (e) {
    return { errorMessage: e.message, data: null };
  }
});
