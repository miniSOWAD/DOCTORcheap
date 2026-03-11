import { IUser } from '@/types/user';

export default function UserTable({ items, onDelete, onRoleChange }: { items: IUser[]; onDelete: (id: string) => void; onRoleChange: (id: string, role: string) => void; }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl border">
      <table className="w-full text-left">
        <thead className="bg-purple-700 text-white"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.email}</td>
              <td className="p-4">
                <select className="border rounded-lg px-3 py-2" defaultValue={item.role} onChange={(e) => item._id && onRoleChange(item._id, e.target.value)}>
                  <option value="user">user</option>
                  <option value="doctor">doctor</option>
                  <option value="pharmacist">pharmacist</option>
                  <option value="seller">seller</option>
                  <option value="admin">admin</option>
                  <option value="superadmin">superadmin</option>
                </select>
              </td>
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