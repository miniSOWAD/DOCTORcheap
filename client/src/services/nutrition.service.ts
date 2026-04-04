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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/nutrition`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch nutrition from server');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Server Fetch Error:', error);
    return [];
  }
};