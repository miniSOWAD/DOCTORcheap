import api from '@/lib/axios';

export const loginUser = async (payload: {
  identifier: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const forgotPassword = async (payload: {
  identifier: string;
  newPassword: string;
}) => {
  const { data } = await api.post('/auth/forgot-password', payload);
  return data;
};