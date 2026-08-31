'use client';

interface Incident {
  time: string;
  type: 'error' | 'warning' | 'success';
  title: string;
  message: string;
}

interface IncidentTimelineProps {
  incidents: Incident[];
  t: {
    incidentTitle: string;
    alertTriggered: string;
    alertMsg: string;
    autoHeal: string;
    autoHealMsg: string;
    diagnostic: string;
    diagnosticMsg: string;
  };
}

export function IncidentTimeline({ incidents, t }: IncidentTimelineProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-error text-error';
      case 'warning':
        return 'border-warning text-warning';
      case 'success':
        return 'border-success text-success';
      default:
        return 'border-base-300 text-base-content';
    }
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3">
      <h3 className="font-bold text-sm flex items-center gap-2 text-base-content">
        <i className="ri-history-line text-info"></i>
        {t.incidentTitle}
      </h3>

      <div className="space-y-3 text-xs pt-2">
        {incidents.map((incident, index) => (
          <div
            key={index}
            className={`flex gap-4 items-start border-l-2 pl-4 py-1 ${getTypeStyles(incident.type)}`}
          >
            <span className="font-mono text-base-content/60 whitespace-nowrap">{incident.time}</span>
            <div className="text-base-content">
              <span className={`font-bold uppercase ${getTypeStyles(incident.type)}`}>
                {incident.title}
              </span>{' '}
              {incident.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}