import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/database/schemas/user.schema';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getPendingUsers() {
    return this.userModel.find({ approvalStatus: 'pending' });
  }

  async approveUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    user.approvalStatus = 'approved';
    await user.save();

    return { message: 'User approved successfully' };
  }

  async rejectUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');

    user.approvalStatus = 'rejected';
    await user.save();

    return { message: 'User rejected' };
  }

  async getSystemStats() {
    const totalUsers = await this.userModel.countDocuments();
    const pendingUsers = await this.userModel.countDocuments({
      approvalStatus: 'pending',
    });

    const doctors = await this.userModel.countDocuments({ role: 'doctor' });
    const pharmacists = await this.userModel.countDocuments({
      role: 'pharmacist',
    });

    return {
      totalUsers,
      pendingUsers,
      doctors,
      pharmacists,
    };
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return { message: 'User deleted successfully' };
  }
}