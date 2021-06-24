import {UrlEnums} from "../types/enums";
import {IResponseData} from "../types/Interfaces";

class DataProvider {
    baseUrl: string;
    constructor(mainUrl: string) {
        this.baseUrl = mainUrl;
    }
    async getBlockData<T>(id: string):Promise<T | undefined>{
        try{
            const result = await fetch(`${this.baseUrl}/${id}`);
            return result.json();
        }catch (e){
            console.error(e)
        }
    }
}


export const dataProvider = new DataProvider(UrlEnums.prefix)
