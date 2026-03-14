export interface INutrition {
  _id?: string;
  title: string;
  foodLines?: string[];
  diseaseUsedFor?: string;
  precautions?: string;
  recommendedFoods?: string[];
  avoidedFoods?: string[];
  notes?: string;
}