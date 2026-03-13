import api from '@/lib/axios';
import { IReport } from '@/types/report';

export const createReport = async (payload: IReport) => {
  const { data } = await api.post('/reports', payload);
  return data;
};

export const getReports = async () => {
  const { data } = await api.get('/reports');
  return data;
};

export const deleteReport = async (id: string) => {
  const { data } = await api.delete(`/reports/${id}`);
  return data;
};