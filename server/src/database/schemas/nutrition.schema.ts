import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NutritionDocument = HydratedDocument<Nutrition>;

@Schema({ timestamps: true })
export class Nutrition {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], default: [] })
  recommendedFoods: string[];

  @Prop({ type: [String], default: [] })
  avoidedFoods: string[];

  @Prop()
  notes?: string;
}

export const NutritionSchema = SchemaFactory.createForClass(Nutrition);