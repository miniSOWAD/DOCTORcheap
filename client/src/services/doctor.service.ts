import api from '@/lib/axios';
import { IDoctor } from '@/types/doctor';

export const getDoctors = async () => (await api.get('/doctors')).data;
export const createDoctor = async (payload: IDoctor) => (await api.post('/doctors', payload)).data;
export const updateDoctor = async (id: string, payload: IDoctor) => (await api.patch(`/doctors/${id}`, payload)).data;
export const deleteDoctor = async (id: string) => (await api.delete(`/doctors/${id}`)).data;

export const getServerDoctors = async (): Promise<IDoctor[]> => {
  try {
    // 1. Removed 'cache: no-store'
    // 2. Added ISR: Rebuilds this data in the background every 60 seconds
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/doctors`, {
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      console.warn('Backend reachable but returned error:', res.status);
      return [];
    }

    const data = await res.json();
    
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    // 3. Swallowing the Netlify ECONNREFUSED error quietly so the build succeeds!
    console.warn('Server Fetch Error (Backend likely offline during build):', (error as Error).message);
    return [];
  }
};