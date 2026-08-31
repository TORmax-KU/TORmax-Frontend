export interface NotificationItem {
  id: string;
  type: 'update' | 'deadline' | 'system' | 'match';
  title: string;
  titleTh: string;
  message: string;
  messageTh: string;
  timestamp: string;
  read: boolean;
  link?: string;
}
