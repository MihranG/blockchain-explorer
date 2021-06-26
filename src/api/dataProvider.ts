import { UrlEnums } from '../types/enums';
import axios from 'axios';

class DataProvider {
  baseUrl: string;
  constructor(mainUrl: string) {
    this.baseUrl = mainUrl;
  }
  async getBlockData<T>(id: string): Promise<T | void> {
    try {
      const { status, data } = await axios(`${this.baseUrl}/${id}`);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export const dataProvider = new DataProvider(UrlEnums.prefix);
