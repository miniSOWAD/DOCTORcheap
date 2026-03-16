import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicineDocument = HydratedDocument<Medicine>;

@Schema({ timestamps: true })
export class Medicine {
  @Prop({ required: true })
  name: string;

  @Prop()
  genericName?: string;

  @Prop()
  brand?: string;

  @Prop()
  dosage?: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ default: 0 })
  unitPrice?: number;

  @Prop()
  ingredients?: string;

  @Prop()
  usage?: string;

  @Prop({ type: [String], default: [] })
  usedFor?: string[];

  @Prop({ type: [String], default: [] })
  sideEffects?: string[];

  @Prop()
  imageUrl?: string;

  @Prop()
  pdfUrl?: string;

  @Prop()
  sellerId?: string;

  @Prop()
  sellerName?: string;

  @Prop()
  sellerUserId?: string;

  @Prop()
  sellerPhone?: string;

  @Prop()
  shopName?: string;

  @Prop()
  companyOrBrand?: string;

  @Prop()
  shopLocation?: string;

  @Prop()
  shopContactInfo?: string;
  }

export const MedicineSchema = SchemaFactory.createForClass(Medicine);