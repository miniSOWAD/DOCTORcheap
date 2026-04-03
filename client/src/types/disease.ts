export type SeriousnessLevel = 'low' | 'medium' | 'high' | 'critical' | string;
export interface IDisease {
  _id?: string;
  name: string;
  seriousnessLevel?: SeriousnessLevel;
  symptoms?: string[];
  warningSymptoms?: string[];
  firstThingToDo?: string;
  doctorTypes?: string[];
  nutritionLink?: string;
  causes?: string[];
  precautions?: string[];

  photo?: string;

  description?: string;
  howToCure?: string;
  howToAvoid?: string;
  prevalentRegions?: string[];
  annualAffected?: number;
  annualDeaths?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}