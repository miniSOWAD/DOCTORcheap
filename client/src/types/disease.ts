export interface IDisease {
  _id?: string;
  name: string;
  seriousnessLevel?: string;
  symptoms?: string[];
  warningSymptoms?: string[];
  firstThingToDo?: string;
  doctorTypes?: string[];
  nutritionLink?: string;
  causes?: string[];
  precautions?: string[];
}