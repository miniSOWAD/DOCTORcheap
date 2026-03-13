import api from '@/lib/axios';

export const getSystemStats = async () => {
  const { data } = await api.get('/superadmin/stats');
  return data;
};

export const getPendingUsers = async () => {
  const { data } = await api.get('/superadmin/pending-users');
  return data;
};

export const approveUser = async (id: string) => {
  const { data } = await api.patch(`/superadmin/approve/${id}`);
  return data;
};

export const rejectUser = async (id: string) => {
  const { data } = await api.patch(`/superadmin/reject/${id}`);
  return data;
};

export const getAllUsersFromSuperadmin = async () => {
  const { data } = await api.get('/superadmin/users');
  return data;
};

export const deleteUserFromSuperadmin = async (id: string) => {
  const { data } = await api.delete(`/superadmin/delete/${id}`);
  return data;
};