'use client';

import { useEffect, useState } from 'react';
import { globalSearch } from '@/services/search.service';

export default function SearchPageClient({ keyword }: { keyword: string }) {
  const [results, setResults] = useState<any>({
    diseases: [],
    doctors: [],
    medicines: [],
    nutrition: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const runSearch = async () => {
      if (!keyword) {
        setResults({
          diseases: [],
          doctors: [],
          medicines: [],
          nutrition: [],
        });
        return;
      }

      try {
        setLoading(true);
        const data = await globalSearch(keyword);
        setResults(data || {
          diseases: [],
          doctors: [],
          medicines: [],
          nutrition: [],
        });
      } catch (error) {
        console.error('Search failed:', error);
        setResults({
          diseases: [],
          doctors: [],
          medicines: [],
          nutrition: [],
        });
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [keyword]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-emerald-700">
        Search results for: {keyword || '...'}
      </h1>

      {loading ? (
        <div className="text-slate-500">Searching...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-5 border">
            <h2 className="font-bold text-xl mb-3">Diseases</h2>
            {results.diseases?.length ? (
              results.diseases.map((item: any) => <p key={item._id}>{item.name}</p>)
            ) : (
              <p className="text-slate-500">No disease results</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <h2 className="font-bold text-xl mb-3">Doctors</h2>
            {results.doctors?.length ? (
              results.doctors.map((item: any) => <p key={item._id}>{item.name}</p>)
            ) : (
              <p className="text-slate-500">No doctor results</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <h2 className="font-bold text-xl mb-3">Medicines</h2>
            {results.medicines?.length ? (
              results.medicines.map((item: any) => <p key={item._id}>{item.name}</p>)
            ) : (
              <p className="text-slate-500">No medicine results</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 border">
            <h2 className="font-bold text-xl mb-3">Nutrition</h2>
            {results.nutrition?.length ? (
              results.nutrition.map((item: any) => <p key={item._id}>{item.title}</p>)
            ) : (
              <p className="text-slate-500">No nutrition results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}