import { IReport } from '@/types/report';

export default function ReportTable({ items, onDelete }: { items: IReport[]; onDelete: (id: string) => void; }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border">
      <table className="w-full text-left">
        <thead className="bg-purple-700 text-white"><tr><th className="p-4">User</th><th className="p-4">Subject</th><th className="p-4">Message</th><th className="p-4">Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-4">{item.userName}</td>
              <td className="p-4">{item.subject}</td>
              <td className="p-4">{item.message}</td>
              <td className="p-4">
                <button onClick={() => item._id && onDelete(item._id)} className="px-3 py-2 bg-red-600 text-white rounded-lg">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}