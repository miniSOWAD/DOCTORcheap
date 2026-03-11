export default function DashboardHero({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-3xl shadow border p-6">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">{title}</h1>
      <p>{description}</p>
    </div>
  );
}