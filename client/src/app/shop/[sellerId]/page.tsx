'use client';

import { useEffect, useState } from 'react';
import { getMedicines } from '@/services/medicine.service';

export default function ShopPage({
  params,
}: {
  params: { sellerId: string };
}) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getMedicines().catch(() => []);
      const filtered = Array.isArray(data)
        ? data.filter((item: any) => item.sellerId === params.sellerId)
        : [];
      setItems(filtered);
    };

    load();
  }, [params.sellerId]);

  const shop = items[0];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-slate-900">
          {shop?.shopName || 'Seller Shop'}
        </h1>
        <p className="mt-2 text-slate-600">Owner: {shop?.sellerName || 'N/A'}</p>
        <p className="text-slate-600">Owner ID: {shop?.sellerUserId || 'N/A'}</p>
        <p className="text-slate-600">Phone: {shop?.sellerPhone || 'N/A'}</p>
        <p className="text-slate-600">Company / Brand: {shop?.companyOrBrand || 'N/A'}</p>
        <p className="text-slate-600">Location: {shop?.shopLocation || 'N/A'}</p>
        <p className="text-slate-600">Contact: {shop?.shopContactInfo || 'N/A'}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
            <p className="mt-2 text-slate-600">Brand: {item.brand || 'N/A'}</p>
            <p className="text-slate-600">Piece Price: ৳{item.price}</p>
            <p className="text-slate-600">Unit Price: ৳{item.unitPrice || 0}</p>
            <p className="text-slate-600">
              Used For: {item.usedFor?.join(', ') || 'N/A'}
            </p>
            <p className="text-slate-600">
              Side Effects: {item.sideEffects?.join(', ') || 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}