import api from '@/lib/axios';
import { INutrition } from '@/types/nutrition';

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

export const getServerNutrition = async (): Promise<INutrition[]> => {
  try {
    // 1. Removed 'cache: no-store'
    // 2. Added ISR: Rebuilds data every 60 seconds without crashing the initial Netlify build
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/nutrition`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn('Backend reachable but returned error:', res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    // 3. Quietly catching the Netlify ECONNREFUSED error so the build successfully completes!
    console.warn('Server Fetch Error (Backend likely offline during build):', (error as Error).message);
    return [];
  }
};