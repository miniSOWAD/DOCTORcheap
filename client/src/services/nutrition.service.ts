import api from '@/lib/axios';
import { INutrition } from '@/types/nutrition';

export const getNutrition = async () => (await api.get('/nutrition')).data;
export const createNutrition = async (payload: INutrition) => (await api.post('/nutrition', payload)).data;
export const updateNutrition = async (id: string, payload: INutrition) => (await api.patch(`/nutrition/${id}`, payload)).data;
export const deleteNutrition = async (id: string) => (await api.delete(`/nutrition/${id}`)).data;