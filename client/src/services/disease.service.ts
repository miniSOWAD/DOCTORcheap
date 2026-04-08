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
// --- NEW: SERVER-SIDE FETCH FUNCTION ---
export const getServerDiseases = async (page = 1, limit = 10): Promise<IDiseaseResponse> => {
  try {
    // 1. Using native fetch for Next.js ISR caching (revalidates every 1 hour)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/diseases?page=${page}&limit=${limit}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.warn('Backend reachable but returned error:', res.status);
      return { success: false, count: 0, total: 0, data: [] };
    }

    return await res.json();
  } catch (error) {
    // 2. Quietly catching the Netlify ECONNREFUSED error so the build completes!
    console.warn('Server Fetch Error on Disease Page (Backend likely offline during build):', (error as Error).message);
    return { success: false, count: 0, total: 0, data: [] };
  }
};