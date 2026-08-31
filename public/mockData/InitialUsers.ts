interface User {
  id: string;
  name: string;
  email: string;
  role: 'Superadmin' | 'Analyst' | 'Vendor';
  status: 'Active' | 'Suspended';
  company: string;
}

export const INITIAL_USERS: User[] = [
  { id: 'USR-001', name: 'Somchai Prasert', email: 'somchai@techcorp.co.th', role: 'Superadmin', status: 'Active', company: 'TechCorp Thailand' },
  { id: 'USR-002', name: 'Kanya Wong', email: 'kanya@cybersec.co.th', role: 'Analyst', status: 'Active', company: 'CyberSec Systems' },
  { id: 'USR-003', name: 'Anan Srisai', email: 'anan@telecom.co.th', role: 'Vendor', status: 'Active', company: 'National Telecom Partner' },
  { id: 'USR-004', name: 'Nipon Boon', email: 'nipon@infra.co.th', role: 'Vendor', status: 'Suspended', company: 'InfraCloud Solutions' },
];