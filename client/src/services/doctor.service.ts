import api from '@/lib/axios';
import { IDoctor } from '@/types/doctor';

export const getDoctors = async () => (await api.get('/doctors')).data;
export const createDoctor = async (payload: IDoctor) => (await api.post('/doctors', payload)).data;
export const updateDoctor = async (id: string, payload: IDoctor) => (await api.patch(`/doctors/${id}`, payload)).data;
export const deleteDoctor = async (id: string) => (await api.delete(`/doctors/${id}`)).data;

export const getServerDoctors = async (): Promise<IDoctor[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/doctors`, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Failed to fetch doctors from server');
    }

    const data = await res.json();
    
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Server Fetch Error:', error);
    return [];
  }
};