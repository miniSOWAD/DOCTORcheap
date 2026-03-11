'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/common/cards/DoctorCard';
import { getDoctors } from '@/services/doctor.service';
import { IDoctor } from '@/types/doctor';

export default function DoctorPage() {
  const [items, setItems] = useState<IDoctor[]>([]);

  useEffect(() => {
    getDoctors().then(setItems);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Doctors</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item) => <DoctorCard key={item._id} doctor={item} />)}
      </div>
    </div>
  );
}