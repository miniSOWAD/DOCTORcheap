import api from '@/lib/axios';
import { IDisease } from '@/types/disease';

export const getDiseases = async () => (await api.get('/diseases')).data;
export const createDisease = async (payload: IDisease) => (await api.post('/diseases', payload)).data;
export const updateDisease = async (id: string, payload: IDisease) => (await api.patch(`/diseases/${id}`, payload)).data;
export const deleteDisease = async (id: string) => (await api.delete(`/diseases/${id}`)).data;