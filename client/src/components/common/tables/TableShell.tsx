export default function TableShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-md">
      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-pink-50 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}