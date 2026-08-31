'use client';

import { TORItem } from '@/types';

interface TORTableProps {
  torList: TORItem[];
  onEdit: (tor: TORItem) => void;
  onDelete: (id: string) => void;
  t: {
    colTorId: string;
    colSource: string;
    colTitle: string;
    colAgency: string;
    colBudget: string;
    colActions: string;
    btnModify: string;
    btnPurge: string;
    repoTitle: string;
    repoSubtitle: string;
  };
}

export function TORTable({ torList, onEdit, onDelete, t }: TORTableProps) {
  return (
    <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
      <div>
        <h3 className="font-bold text-base text-base-content">{t.repoTitle}</h3>
        <p className="text-xs text-base-content/80">{t.repoSubtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-xs text-base-content">
          <thead>
            <tr className="text-base-content/80">
              <th>{t.colTorId}</th>
              <th>{t.colSource}</th>
              <th>{t.colTitle}</th>
              <th>{t.colAgency}</th>
              <th>{t.colBudget}</th>
              <th className="text-right">{t.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {torList.map((item) => (
              <tr key={item.id}>
                <td className="font-mono font-bold text-base-content">{item.id}</td>
                <td>
                  <span className="badge badge-primary badge-outline font-mono text-[10px]">{item.sourcePortal}</span>
                </td>
                <td className="truncate max-w-xs font-medium text-base-content">{item.name}</td>
                <td className="text-base-content/80">{item.employer}</td>
                <td className="font-mono font-bold text-base-content">{item.price}</td>
                <td className="text-right space-x-1">
                  <button onClick={() => onEdit({ ...item })} className="btn btn-xs btn-outline">
                    <i className="ri-edit-line"></i> {t.btnModify}
                  </button>
                  <button onClick={() => onDelete(item.id)} className="btn btn-xs btn-error btn-outline">
                    <i className="ri-delete-bin-line"></i> {t.btnPurge}
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