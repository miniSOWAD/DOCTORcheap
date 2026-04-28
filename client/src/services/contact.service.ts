import api from '@/lib/axios';
import { IContact } from '@/types/contact';

export const submitContactMessage = async (payload: IContact) => {
  const { data } = await api.post('/contact', payload);
  return data;
};