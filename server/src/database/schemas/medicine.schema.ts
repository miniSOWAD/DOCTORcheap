import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicineDocument = HydratedDocument<Medicine>;

@Schema({ timestamps: true })
export class Medicine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  genericName: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  usage?: string;

  @Prop({ type: [String], default: [] })
  sideEffects?: string[];

  @Prop()
  imageUrl?: string;

  @Prop()
  pdfUrl?: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);