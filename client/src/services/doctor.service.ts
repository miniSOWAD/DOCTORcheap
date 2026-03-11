import api from '@/lib/axios';
import { IDoctor } from '@/types/doctor';

export const getDoctors = async () => (await api.get('/doctors')).data;
export const createDoctor = async (payload: IDoctor) => (await api.post('/doctors', payload)).data;
export const updateDoctor = async (id: string, payload: IDoctor) => (await api.patch(`/doctors/${id}`, payload)).data;
export const deleteDoctor = async (id: string) => (await api.delete(`/doctors/${id}`)).data;