export interface IMedicine {
  _id?: string;
  name: string;
  genericName: string;
  brand: string;
  dosage: string;
  price: number;
  usage?: string;
  sideEffects?: string[];
  imageUrl?: string;
  pdfUrl?: string;
}