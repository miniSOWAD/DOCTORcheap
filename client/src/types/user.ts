export type UserRole =
  | 'user'
  | 'doctor'
  | 'pharmacist'
  | 'seller'
  | 'admin'
  | 'superadmin';

export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export interface IUser {
  _id?: string;
  name: string;
  email?: string;
  userId?: string;
  phone?: string;
  role: UserRole;
  profileImage?: string;
  nidImage?: string;
  licenseImage?: string;
  approvalStatus?: ApprovalStatus;
}