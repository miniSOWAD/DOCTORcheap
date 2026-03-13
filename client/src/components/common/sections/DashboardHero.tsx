export default function DashboardHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[32px] border border-emerald-100 bg-white/85 p-6 shadow-[0_20px_60px_rgba(16,185,129,0.10)] backdrop-blur-md md:p-8">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
        {description}
      </p>
    </div>
  );
}