import api from '@/lib/axios';
import type { IDisease } from '@/types/disease';

export interface IDiseaseResponse {
  success: boolean;
  count: number;
  total: number;
  data: IDisease[];
}

export const DISEASE_TAGS = {
  all: 'diseases',
  byId: (id: string) => `disease:${id}`,
};

export const getDiseases = async (page?: number, limit?: number): Promise<IDiseaseResponse | any> => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const { data } = await api.get(`/diseases${queryString}`);
  return data;
};

export const createDisease = async (payload: Partial<IDisease> | any) => {
  const { data } = await api.post('/diseases', payload);
  return data;
};

export const updateDisease = async (id: string, payload: Partial<IDisease> | any) => {
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

export const getServerDiseases = async (
  page = 1,
  limit = 10,
  cacheConfig?: RequestInit
): Promise<IDiseaseResponse> => {
  try {
    const finalCacheConfig = cacheConfig || { next: { tags: [DISEASE_TAGS.all], revalidate: 3600 } };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/diseases?page=${page}&limit=${limit}`,
      finalCacheConfig
    );

    if (!response.ok) {
      throw new Error('Failed to fetch diseases from server');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in server disease service:', error);
    return { success: false, count: 0, total: 0, data: [] };
  }
};