import { useApi } from '@/apis/request.js';

export const getDefinition = async (vocabulary) => {
  try {
    const data = await useApi.get(vocabulary, null);
    return data[0];
  } catch (e) {
    return Promise.reject(e);
  }
};
