import { IMedicine } from '@/types/medicine';

export default function MedicineCard({ medicine }: { medicine: IMedicine }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-pink-200">
      <h3 className="text-xl font-bold text-purple-800">{medicine.name}</h3>
      <p>Generic: {medicine.genericName}</p>
      <p>Brand: {medicine.brand}</p>
      <p>Dosage: {medicine.dosage}</p>
      <p>Price: ৳{medicine.price}</p>
      <p>{medicine.usage}</p>
    </div>
  );
}