import api from '@/lib/axios';
import { IReport } from '@/types/report';

export const createReport = async (payload: IReport) => (await api.post('/reports', payload)).data;
export const getReports = async () => (await api.get('/reports')).data;
export const deleteReport = async (id: string) => (await api.delete(`/reports/${id}`)).data;