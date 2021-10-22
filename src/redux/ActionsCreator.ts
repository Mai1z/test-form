import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IFormData {
  user: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  },
  order: {
    flatsCount: number,
    time: number,
  },
}

export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async () => {
    const response = await axios.get('https://api.pik.ru/v2/offer/special?types=1,2&locations=2,3');
    return response.data;
  },
);

export const fetchForm = createAsyncThunk(
  'form/fetch',
  async (formData: IFormData) => {
    const response = await axios.post('https://strapi.pik.ru/front-tests', formData);
    return response.data;
  },
);
