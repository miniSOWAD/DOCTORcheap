import { IDisease } from '@/types/disease';

export default function DiseaseCard({ disease }: { disease: IDisease }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-pink-200">
      <h3 className="text-xl font-bold text-purple-800">
        {disease.name || 'Unknown Disease'}
      </h3>
      <p>
        <strong>Symptoms:</strong> {disease.symptoms?.join(', ') || 'Not specified'}
      </p>
      <p>
        <strong>Causes:</strong> {disease.causes?.join(', ') || 'Not specified'}
      </p>
      <p>
        <strong>Precautions:</strong> {disease.precautions?.join(', ') || 'Not specified'}
      </p>
    </div>
  );
}