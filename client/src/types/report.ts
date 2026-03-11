export interface IReport {
  _id?: string;
  userName: string;
  email: string;
  subject: string;
  message: string;
  fileUrl?: string;
}