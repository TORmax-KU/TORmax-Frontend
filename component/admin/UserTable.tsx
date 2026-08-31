'use client';

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onToggleStatus: (userId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  t: {
    userTitle: string;
    userSubtitle: string;
    searchUserPlaceholder: string;
    colUserId: string;
    colUserDetails: string;
    colOrg: string;
    colRole: string;
    colStatus: string;
    colAccessAction: string;
    btnSuspend: string;
    btnAuthorize: string;
  };
}

export function UserTable({ 
  users, 
  onToggleStatus, 
  searchQuery, 
  onSearchChange, 
  t 
}: UserTableProps) {
  return (
    <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-base text-base-content">{t.userTitle}</h3>
          <p className="text-xs text-base-content/80">{t.userSubtitle}</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchUserPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input input-sm input-bordered w-64 pr-8 text-xs text-base-content bg-base-100"
          />
          <i className="ri-search-line absolute right-2.5 top-2 text-base-content/70"></i>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-xs text-base-content">
          <thead>
            <tr className="text-base-content/80">
              <th>{t.colUserId}</th>
              <th>{t.colUserDetails}</th>
              <th>{t.colOrg}</th>
              <th>{t.colRole}</th>
              <th>{t.colStatus}</th>
              <th className="text-right">{t.colAccessAction}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-mono text-base-content/70">{u.id}</td>
                <td>
                  <div className="font-bold text-base-content">{u.name}</div>
                  <div className="text-[11px] text-base-content/80 font-mono">{u.email}</div>
                </td>
                <td className="text-base-content">{u.company}</td>
                <td>
                  <span className="badge badge-accent badge-sm font-bold">{u.role}</span>
                </td>
                <td>
                  <span className={`badge badge-sm font-bold ${u.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => onToggleStatus(u.id)}
                    className={`btn btn-xs ${u.status === 'Active' ? 'btn-warning btn-outline' : 'btn-success btn-outline'}`}
                  >
                    {u.status === 'Active' ? t.btnSuspend : t.btnAuthorize}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}