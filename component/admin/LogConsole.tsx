'use client';

import { LogEntry } from '@/interface/LogEntry';

interface LogConsoleProps {
  logs: LogEntry[];
  onClear: () => void;
  t: {
    logTitle: string;
    logSubtitle: string;
    btnClear: string;
    noLogs: string;
  };
}

export function LogConsole({ logs, onClear, t }: LogConsoleProps) {
  const getLogTypeStyles = (type: string) => {
    switch (type) {
      case 'ALERT':
        return 'bg-error/20 text-error';
      case 'SCRAPE':
        return 'bg-primary/20 text-primary';
      case 'DIAGNOSTIC':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-success/20 text-success';
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 p-6 space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base flex items-center gap-2 text-base-content">
            <i className="ri-terminal-box-line text-error"></i>
            {t.logTitle}
          </h3>
          <p className="text-xs text-base-content/80">{t.logSubtitle}</p>
        </div>
        <button onClick={onClear} className="btn btn-xs btn-ghost text-error">
          {t.btnClear}
        </button>
      </div>

      <div className="bg-base-200 border border-base-300 text-base-content rounded-xl p-4 font-mono text-xs h-96 overflow-y-auto space-y-2 shadow-inner">
        {logs.length === 0 ? (
          <div className="text-base-content/50 italic">{t.noLogs}</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-3 leading-relaxed border-b border-base-300/60 pb-1">
              <span className="text-base-content/60 font-bold">[{log.time}]</span>
              <span className={`font-bold px-1.5 rounded text-[10px] ${getLogTypeStyles(log.type)}`}>
                {log.type}
              </span>
              <span className="text-base-content">{log.msg}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}