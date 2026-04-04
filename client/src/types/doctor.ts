export interface IDoctor {
  _id?: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee?: number;
  about?: string;
  photo?: string;
}