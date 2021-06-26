import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IResponseData, IResponseResult} from "../types/Interfaces";
import {fetchBlock} from './thunks';



interface IBlockSliceData{
    data: IResponseData,
    loading: boolean
}

const initialState : IBlockSliceData = {
    data: {
        jsonrpc: '',
        id: -1,
        result: null,
    },
    loading: false

}

const blockSlice = createSlice({
    name: 'blockData',
    initialState,
    reducers: {
        setBLockData(state, action: PayloadAction<IResponseData>){
            state.data = action.payload;
            state.loading = false;
        },
        removeBlockData(state){
            state =  initialState;
        }
    },
    extraReducers: builder =>  {
        builder.addCase(fetchBlock.pending, (state)=>{
            state.loading = true;
        });
        builder.addCase(fetchBlock.rejected, (state)=>{
            state.loading = false;
        })
        builder.addCase(fetchBlock.fulfilled, (state, action)=>{
            if(action.payload){
                state.data = action.payload;
            }
            state.loading = false;
        })
    }
})


export default blockSlice
