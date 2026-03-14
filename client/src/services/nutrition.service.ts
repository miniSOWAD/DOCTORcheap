import api from '@/lib/axios';

export const getNutrition = async () => {
  const { data } = await api.get('/nutrition');
  return data;
};

export const createNutrition = async (payload: any) => {
  const { data } = await api.post('/nutrition', payload);
  return data;
};

export const updateNutrition = async (id: string, payload: any) => {
  const { data } = await api.patch(`/nutrition/${id}`, payload);
  return data;
};

export const deleteNutrition = async (id: string) => {
  const { data } = await api.delete(`/nutrition/${id}`);
  return data;
};

export const bulkImportNutrition = async (payload: { nutrition: any[] }) => {
  const { data } = await api.post('/nutrition/bulk-import', payload);
  return data;
};