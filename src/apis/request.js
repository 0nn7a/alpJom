import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  headers: {
    'Content-Type': 'application/json',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const useApi = {
  get(url, params) {
    return instance.get(url, { params });
  },
};
