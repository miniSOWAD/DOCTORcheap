import api from '@/lib/axios';

export const getDiseases = async () => {
  const { data } = await api.get('/diseases');
  return data;
};

export const createDisease = async (payload: any) => {
  const { data } = await api.post('/diseases', payload);
  return data;
};

export const updateDisease = async (id: string, payload: any) => {
  const { data } = await api.patch(`/diseases/${id}`, payload);
  return data;
};

export const deleteDisease = async (id: string) => {
  const { data } = await api.delete(`/diseases/${id}`);
  return data;
};

export const bulkImportDiseases = async (payload: { diseases: any[] }) => {
  const { data } = await api.post('/diseases/bulk-import', payload);
  return data;
};