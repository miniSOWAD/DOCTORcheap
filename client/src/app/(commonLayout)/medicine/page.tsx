'use client';

import { useEffect, useState } from 'react';
import MedicineCard from '@/components/common/cards/MedicineCard';
import { getMedicines } from '@/services/medicine.service';
import { IMedicine } from '@/types/medicine';

export default function MedicinePage() {
  const [items, setItems] = useState<IMedicine[]>([]);

  useEffect(() => {
    getMedicines().then(setItems);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Medicines</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => <MedicineCard key={item._id} medicine={item} />)}
      </div>
    </div>
  );
}