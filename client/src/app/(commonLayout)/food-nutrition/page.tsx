'use client';

import { useEffect, useState } from 'react';
import NutritionCard from '@/components/common/cards/NutritionCard';
import { getNutrition } from '@/services/nutrition.service';
import { INutrition } from '@/types/nutrition';

export default function FoodNutritionPage() {
  const [items, setItems] = useState<INutrition[]>([]);

  useEffect(() => {
    getNutrition().then(setItems);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Food & Nutrition</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => <NutritionCard key={item._id} nutrition={item} />)}
      </div>
    </div>
  );
}