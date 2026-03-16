export interface IMedicine {
  _id?: string;
  name: string;
  genericName?: string;
  brand?: string;
  dosage?: string;
  price: number;
  unitPrice?: number;
  ingredients?: string;
  usage?: string;
  usedFor?: string[];
  sideEffects?: string[];
  imageUrl?: string;
  pdfUrl?: string;

  sellerId?: string;
  sellerName?: string;
  sellerUserId?: string;
  sellerPhone?: string;
  shopName?: string;
  companyOrBrand?: string;
  shopLocation?: string;
  shopContactInfo?: string;
}