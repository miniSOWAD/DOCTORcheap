import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema({ timestamps: true })
export class Report {
  @Prop({ required: true })
  userName: string;

  @Prop()
  sellerId?: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  fileUrl?: string;

  @Prop({ default: 'general' })
  type?: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);