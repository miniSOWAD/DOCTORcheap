import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../schemas/user.schema';
import { Role } from '@/shared/enums/role.enum';

@Injectable()
export class SuperAdminSeed implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    console.log('🔎 Checking SuperAdmin...');

    const exists = await this.userModel.findOne({ role: Role.SUPERADMIN });

    if (exists) {
      console.log('✅ SuperAdmin already exists');
      return;
    }

    const password = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD || 'superadmin123',
      10,
    );

    await this.userModel.create({
      name: process.env.SUPERADMIN_NAME || 'System SuperAdmin',
      email: process.env.SUPERADMIN_EMAIL || 'superadmin@doctorcheap.com',
      phone: process.env.SUPERADMIN_PHONE || '9999999999',
      userId: process.env.SUPERADMIN_USER_ID || 'SUPERADMIN001',
      password,
      role: Role.SUPERADMIN,
      approvalStatus: 'approved',
    });

    console.log('🔥 SuperAdmin created successfully');
  }
}