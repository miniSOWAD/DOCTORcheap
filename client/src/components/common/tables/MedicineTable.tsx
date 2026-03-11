import { IMedicine } from '@/types/medicine';

export default function MedicineTable({ items, onEdit, onDelete }: { items: IMedicine[]; onEdit: (item: IMedicine) => void; onDelete: (id: string) => void; }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border">
      <table className="w-full text-left">
        <thead className="bg-purple-700 text-white"><tr><th className="p-4">Name</th><th className="p-4">Brand</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.brand}</td>
              <td className="p-4">৳{item.price}</td>
              <td className="p-4 flex gap-2">
                <button onClick={() => onEdit(item)} className="px-3 py-2 bg-black text-white rounded-lg">Edit</button>
                <button onClick={() => item._id && onDelete(item._id)} className="px-3 py-2 bg-red-600 text-white rounded-lg">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}