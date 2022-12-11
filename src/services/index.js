import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: 'https://rental-api.onrender.com',
});
