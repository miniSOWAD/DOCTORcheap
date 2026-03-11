import { INutrition } from '@/types/nutrition';

export default function NutritionCard({ nutrition }: { nutrition: INutrition }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-pink-200">
      <h3 className="text-xl font-bold text-purple-800">{nutrition.title}</h3>
      <p><strong>Recommended:</strong> {nutrition.recommendedFoods.join(', ')}</p>
      <p><strong>Avoid:</strong> {nutrition.avoidedFoods.join(', ')}</p>
      <p>{nutrition.notes}</p>
    </div>
  );
}