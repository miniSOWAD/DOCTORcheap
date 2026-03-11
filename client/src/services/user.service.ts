import api from '@/lib/axios';

export const getUsers = async () => (await api.get('/users')).data;
export const updateUserRole = async (id: string, role: string) => (await api.patch(`/users/${id}/role`, { role })).data;
export const deleteUser = async (id: string) => (await api.delete(`/users/${id}`)).data;