import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiseaseDocument = HydratedDocument<Disease>;

@Schema({ timestamps: true })
export class Disease {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  symptoms: string[];

  @Prop({ type: [String], default: [] })
  causes: string[];

  @Prop({ type: [String], default: [] })
  precautions: string[];
}

export const DiseaseSchema = SchemaFactory.createForClass(Disease);