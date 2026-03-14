import api from '@/lib/axios';
import { IMedicine } from '@/types/medicine';

export const getMedicines = async () => {
  const { data } = await api.get('/medicines');
  return data;
};

export const createMedicine = async (payload: IMedicine) => {
  const { data } = await api.post('/medicines', payload);
  return data;
};

export const updateMedicine = async (id: string, payload: Partial<IMedicine>) => {
  const { data } = await api.patch(`/medicines/${id}`, payload);
  return data;
};

export const deleteMedicine = async (id: string) => {
  const { data } = await api.delete(`/medicines/${id}`);
  return data;
};

export const bulkImportMedicines = async (payload: { medicines: IMedicine[] }) => {
  const { data } = await api.post('/medicines/bulk-import', payload);
  return data;
};