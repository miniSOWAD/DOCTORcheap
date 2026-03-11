import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  specialization: string;

  @Prop({ required: true })
  qualification: string;

  @Prop({ default: 0 })
  experience: number;

  @Prop({ default: 0 })
  consultationFee?: number;

  @Prop()
  about?: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);