import api from '@/lib/axios';

export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const getMyProfile = async () => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMyProfile = async (payload: {
  name?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
  shopName?: string;
  companyOrBrand?: string;
  shopLocation?: string;
  shopContactInfo?: string;
}) => {
  const { data } = await api.patch('/users/me', payload);
  return data;
};

export const createUser = async (payload: {
  name: string;
  userId: string;
  email?: string;
  phone: string;
  password?: string;
  role: string;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  nidImage?: string;
  licenseImage?: string;
}) => {
  const { data } = await api.post('/users', payload);
  return data;
};

export const updateUser = async (
  id: string,
  payload: Partial<{
    name: string;
    userId: string;
    email?: string;
    phone: string;
    password?: string;
    role: string;
    approvalStatus?: 'approved' | 'pending' | 'rejected';
    nidImage?: string;
    licenseImage?: string;
  }>,
) => {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data;
};

export const updateUserRole = async (id: string, role: string) => {
  const { data } = await api.patch(`/users/${id}/role`, { role });
  return data;
};

export const updateApprovalStatus = async (
  id: string,
  approvalStatus: 'approved' | 'pending' | 'rejected',
) => {
  const { data } = await api.patch(`/users/${id}/approval-status`, {
    approvalStatus,
  });
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};