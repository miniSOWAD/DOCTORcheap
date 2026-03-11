import { IDoctor } from '@/types/doctor';

export default function DoctorCard({ doctor }: { doctor: IDoctor }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 border border-pink-200">
      <h3 className="text-xl font-bold text-purple-800">{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <p>{doctor.qualification}</p>
      <p>{doctor.experience} years experience</p>
      <p>Fee: ৳{doctor.consultationFee || 0}</p>
    </div>
  );
}