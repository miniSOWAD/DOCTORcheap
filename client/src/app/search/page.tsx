'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { globalSearch } from '@/services/search.service';

export default function SearchPage() {
  const params = useSearchParams();
  const keyword = params.get('keyword') || '';
  const [results, setResults] = useState<any>({ diseases: [], doctors: [], medicines: [], nutrition: [] });

  useEffect(() => {
    if (keyword) globalSearch(keyword).then(setResults);
  }, [keyword]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-purple-800">Search results for: {keyword}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border"><h2 className="font-bold text-xl mb-3">Diseases</h2>{results.diseases.map((item: any) => <p key={item._id}>{item.name}</p>)}</div>
        <div className="bg-white rounded-2xl p-5 border"><h2 className="font-bold text-xl mb-3">Doctors</h2>{results.doctors.map((item: any) => <p key={item._id}>{item.name}</p>)}</div>
        <div className="bg-white rounded-2xl p-5 border"><h2 className="font-bold text-xl mb-3">Medicines</h2>{results.medicines.map((item: any) => <p key={item._id}>{item.name}</p>)}</div>
        <div className="bg-white rounded-2xl p-5 border"><h2 className="font-bold text-xl mb-3">Nutrition</h2>{results.nutrition.map((item: any) => <p key={item._id}>{item.title}</p>)}</div>
      </div>
    </div>
  );
}