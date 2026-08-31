export interface LogEntry {
  id: string;
  time: string;
  type: 'SYNC' | 'CREATE' | 'ALERT' | 'SCRAPE' | 'DIAGNOSTIC';
  msg: string;
}