export interface INutrition {
  _id?: string;
  title: string;
  recommendedFoods: string[];
  avoidedFoods: string[];
  notes?: string;
}