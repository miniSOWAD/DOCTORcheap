import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '@/database/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.userModel.find().select('-password').sort({ createdAt: -1 });
  }

  async create(payload: any) {
    const existingUserId = await this.userModel.findOne({ userId: payload.userId });
    if (existingUserId) throw new BadRequestException('User ID already exists');

    const existingPhone = await this.userModel.findOne({ phone: payload.phone });
    if (existingPhone) throw new BadRequestException('Phone already exists');

    if (payload.email) {
      const existingEmail = await this.userModel.findOne({ email: payload.email });
      if (existingEmail) throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password || '123456', 10);

    const user = await this.userModel.create({
      ...payload,
      password: hashedPassword,
    });

    return {
      message: 'User created successfully',
      user,
    };
  }

  async update(id: string, payload: any) {
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .select('-password');

    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async updateRole(id: string, role: string) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, { role }, { new: true })
      .select('-password');

    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async updateApprovalStatus(id: string, approvalStatus: string) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, { approvalStatus }, { new: true })
      .select('-password');

    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}