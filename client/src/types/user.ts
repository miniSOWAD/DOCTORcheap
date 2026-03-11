export type UserRole = 'user' | 'doctor' | 'pharmacist' | 'seller' | 'admin' | 'superadmin';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}