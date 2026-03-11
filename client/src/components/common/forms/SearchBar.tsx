'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?keyword=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex items-center bg-white rounded-full border border-pink-200 overflow-hidden shadow-sm">
      <input
        type="text"
        placeholder="Search diseases, doctors, medicines, nutrition..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="w-full px-4 py-3 outline-none bg-transparent"
      />
      <button onClick={handleSearch} className="bg-purple-700 text-white px-5 py-3">
        <Search size={18} />
      </button>
    </div>
  );
}