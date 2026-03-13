import api from '@/lib/axios';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const updateUserRole = async (id: string, role: string) => {
  const { data } = await api.patch(`/users/${id}/role`, { role });
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};