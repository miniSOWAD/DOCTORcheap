import api from '@/lib/axios';

export const loginUser = async (payload: { email: string; password: string }) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerUser = async (payload: { name: string; email: string; password: string; role: string }) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};