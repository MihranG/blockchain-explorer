import {createAsyncThunk} from "@reduxjs/toolkit";
import {dataProvider} from "../api/dataProvider";
import {IResponseData} from "../types/Interfaces";
import {hexNumberObjectManipulation} from "../utils/exceptions";

export const fetchBlock = createAsyncThunk('block/fetchBlock', async (id: string)=>{
    try{
        const initialResult = await dataProvider.getBlockData<{ data: IResponseData }>(id)
        if (initialResult?.data?.result) {
            const result = hexNumberObjectManipulation(initialResult.data.result);
            return{ ...initialResult.data, result };
        }
    }catch (e){
        console.log('error', e);
    }
})
