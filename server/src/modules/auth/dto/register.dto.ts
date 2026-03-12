import { Role } from '@/shared/enums/role.enum';

export class RegisterDto {
  name: string;
  userId: string;
  email?: string;
  phone: string;
  password: string;
  role: Role;
  nidImage?: string;
  licenseImage?: string;
}