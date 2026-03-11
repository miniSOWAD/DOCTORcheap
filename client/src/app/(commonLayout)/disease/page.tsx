'use client';

import { useEffect, useState } from 'react';
import DiseaseCard from '@/components/common/cards/DiseaseCard';
import { getDiseases } from '@/services/disease.service';
import { IDisease } from '@/types/disease';

export default function DiseasePage() {
  const [items, setItems] = useState<IDisease[]>([]);

  useEffect(() => {
    getDiseases().then(setItems);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Diseases</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => <DiseaseCard key={item._id} disease={item} />)}
      </div>
    </div>
  );
}