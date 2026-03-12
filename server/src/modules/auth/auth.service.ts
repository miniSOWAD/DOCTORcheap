import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '@/database/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@/shared/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUserId = await this.userModel.findOne({ userId: dto.userId });
    if (existingUserId) {
      throw new BadRequestException('User ID already exists');
    }

    const existingPhone = await this.userModel.findOne({ phone: dto.phone });
    if (existingPhone) {
      throw new BadRequestException('Phone already exists');
    }

    if (dto.email) {
      const existingEmail = await this.userModel.findOne({ email: dto.email });
      if (existingEmail) {
        throw new BadRequestException('Email already exists');
      }
    }

    const rolesNeedingApproval = [
      Role.DOCTOR,
      Role.PHARMACIST,
      Role.SELLER,
      Role.ADMIN,
    ];

    if (rolesNeedingApproval.includes(dto.role)) {
      if (!dto.nidImage || !dto.licenseImage) {
        throw new BadRequestException('NID image and license image are required');
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const approvalStatus = rolesNeedingApproval.includes(dto.role)
      ? 'pending'
      : 'approved';

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
      approvalStatus,
    });

    return {
      message:
        approvalStatus === 'pending'
          ? 'Registration successful. Please wait for superadmin approval.'
          : 'User registered successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const query: any = {
      $or: [
        { email: dto.identifier },
        { userId: dto.identifier },
        { phone: dto.identifier },
      ],
    };

    if (isValidObjectId(dto.identifier)) {
      query.$or.push({ _id: dto.identifier });
    }

    const user = await this.userModel.findOne(query);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user.approvalStatus !== 'approved') {
      throw new UnauthorizedException(
        user.approvalStatus === 'pending'
          ? 'Your account is pending superadmin approval'
          : 'Your account has been rejected',
      );
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      userId: user.userId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userId: user.userId,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
        approvalStatus: user.approvalStatus,
      },
    };
  }

  async forgotPassword(dto: { identifier: string; newPassword: string }) {
    const query: any = {
      $or: [
        { email: dto.identifier },
        { userId: dto.identifier },
        { phone: dto.identifier },
      ],
    };

    if (isValidObjectId(dto.identifier)) {
      query.$or.push({ _id: dto.identifier });
    }

    const user = await this.userModel.findOne(query);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return {
      message: 'Password updated successfully',
    };
  }
}