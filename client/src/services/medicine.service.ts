import api from '@/lib/axios';
import { IMedicine } from '@/types/medicine';

export const getMedicines = async () => (await api.get('/medicines')).data;
export const createMedicine = async (payload: IMedicine) => (await api.post('/medicines', payload)).data;
export const updateMedicine = async (id: string, payload: IMedicine) => (await api.patch(`/medicines/${id}`, payload)).data;
export const deleteMedicine = async (id: string) => (await api.delete(`/medicines/${id}`)).data;