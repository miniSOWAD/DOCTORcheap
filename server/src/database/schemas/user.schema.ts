import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@/shared/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, unique: true, sparse: true })
  email?: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['user', 'doctor', 'pharmacist', 'seller', 'admin', 'superadmin'],
    default: 'user',
  })
  role: string;

  @Prop()
  profileImage?: string;

  @Prop()
  nidImage?: string;

  @Prop()
  licenseImage?: string;

  @Prop()
  shopName?: string;

  @Prop()
  companyOrBrand?: string;

  @Prop()
  shopLocation?: string;

  @Prop()
  shopContactInfo?: string;

  @Prop({
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved',
  })
  approvalStatus: ApprovalStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);