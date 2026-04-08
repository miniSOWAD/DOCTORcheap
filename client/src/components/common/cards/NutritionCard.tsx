import { INutrition } from '@/types/nutrition';

export default function NutritionCard({ nutrition }: { nutrition: INutrition }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-pink-200">
      <h3 className="text-xl font-bold text-purple-800">
        {nutrition.name || 'Unknown Food'}
      </h3>
      
      {/* Safely map to the NEW database fields using ?. and || */}
      <p>
        <strong>Ingredients:</strong> {nutrition.ingredients?.join(', ') || 'Not specified'}
      </p>
      <p>
        <strong>Used For:</strong> {nutrition.usedForDiseases?.join(', ') || 'Not specified'}
      </p>
      <p>
        <strong>Benefits:</strong> {nutrition.benefits || 'No details provided'}
      </p>
    </div>
  );
}