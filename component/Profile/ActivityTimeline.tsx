'use client';

import { Activity } from "@/interface/UserProfile/Activity";
import { RiTimeLine, RiCheckLine, RiFileListLine, RiUserLine } from "@remixicon/react";

interface ActivityTimelineProps {
    activity: Activity[];
}

export default function ActivityTimeline({ activity }: ActivityTimelineProps) {
    const getActivityIcon = (type: string) => {
        switch(type) {
            case 'project':
                return <RiFileListLine className="h-4 w-4 text-primary" />;
            case 'document':
                return <RiFileListLine className="h-4 w-4 text-success" />;
            case 'profile':
                return <RiUserLine className="h-4 w-4 text-info" />;
            default:
                return <RiTimeLine className="h-4 w-4 text-base-content/40" />;
        }
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <RiTimeLine className="h-5 w-5 text-warning" />
                Activity Timeline
            </h3>

            <div className="space-y-4">
                {activity.map((item) => (
                    <div key={item.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-200 flex items-center justify-center">
                            {getActivityIcon(item.type)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm">{item.title}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-base-content/40">{item.timestamp}</span>
                                {item.status && (
                                    <span className="badge badge-ghost badge-xs">{item.status}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {activity.length === 0 && (
                    <p className="text-sm text-base-content/40 text-center py-4">No recent activity</p>
                )}
            </div>
        </div>
    );
}