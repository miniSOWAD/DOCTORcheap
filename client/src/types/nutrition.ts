export interface INutrition {
  _id?: string;
  name: string;
  image?: string;
  imageUrl?: string;
  ingredients?: string[];
  benefits?: string;
  origin?: string;
  popularIn?: string;
  usedForDiseases?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
  foodLines?: string[];
  diseaseUsedFor?: string;
  precautions?: string;
  recommendedFoods?: string[];
  avoidedFoods?: string[];
  notes?: string;
}