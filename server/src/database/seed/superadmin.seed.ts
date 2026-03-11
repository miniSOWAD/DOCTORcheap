import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserSchema } from '../schemas/user.schema';
import { Role } from '@/shared/enums/role.enum';

async function seedSuperAdmin() {
  await mongoose.connect(process.env.MONGODB_URI || '');
  const User = mongoose.model('User', UserSchema);

  const exists = await User.findOne({ role: Role.SUPERADMIN });
  if (exists) {
    console.log('Superadmin already exists');
    process.exit(0);
  }

  const password = await bcrypt.hash('superadmin123', 10);

  await User.create({
    name: 'Super Admin',
    email: 'superadmin@medcare.com',
    password,
    role: Role.SUPERADMIN,
  });

  console.log('Superadmin created');
  process.exit(0);
}

seedSuperAdmin();