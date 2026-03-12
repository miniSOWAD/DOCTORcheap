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

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop()
  profileImage?: string;

  @Prop()
  nidImage?: string;

  @Prop()
  licenseImage?: string;

  @Prop({
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved',
  })
  approvalStatus: ApprovalStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);