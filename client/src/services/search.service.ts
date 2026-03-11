import api from '@/lib/axios';

export const globalSearch = async (keyword: string) => {
  const { data } = await api.get(`/search?keyword=${encodeURIComponent(keyword)}`);
  return data;
};