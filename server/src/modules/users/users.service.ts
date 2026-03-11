import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/database/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find().select('-password');
  }

  async updateRole(id: string, role: string) {
    const updated = await this.userModel.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }
}