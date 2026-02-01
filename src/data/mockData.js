export const USERS = [
  { id: 'u1', name: 'Juma M', role: 'Security Guard', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Sarah K', role: 'Administrator', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Dr. Ali', role: 'Head of Dept', avatar: 'https://i.pravatar.cc/150?u=u3' },
];

export const NOTICES = [
  {
    id: 'n1',
    author: 'Office of the VC',
    title: 'Presidential Visit Logistics',
    date: '2023-10-24T09:00:00',
    content: 'All staff are required to park in the North Lot during the presidential visit. Security protocols will be strictly enforced.',
    isCritical: true,
  },
  {
    id: 'n2',
    author: 'HR Department',
    title: 'Annual Leave Submissions',
    date: '2023-10-23T14:30:00',
    content: 'Please submit your annual leave requests by the end of the month for processing.',
    isCritical: false,
  },
  {
    id: 'n3',
    author: 'IT Support',
    title: 'System Maintenance',
    date: '2023-10-22T10:00:00',
    content: 'The "Office3" system will undergo scheduled maintenance this Sunday from 2am to 4am.',
    isCritical: false,
  },
];

export const REQUESTS = [
  { id: 'r1', type: 'Broken AC', location: 'Room 104', status: 'Pending', date: '2023-10-24', requestor: 'u3' },
  { id: 'r2', type: 'Salary Advance', amount: '500,000 TZS', status: 'Approved', date: '2023-10-20', requestor: 'u1' },
];

export const ORG_NODES = [
  { id: 'root', type: 'input', data: { label: 'UDSM (University)' }, position: { x: 250, y: 0 } },
  { id: 'col1', data: { label: 'College of Agriculture' }, position: { x: 100, y: 100 } },
  { id: 'col2', data: { label: 'College of Engineering' }, position: { x: 400, y: 100 } },
  { id: 'unit1', data: { label: 'Security Unit' }, position: { x: 0, y: 200 } },
  { id: 'unit2', data: { label: 'Transport Unit' }, position: { x: 200, y: 200 } },
  { id: 'unit3', data: { label: 'Academic Staff' }, position: { x: 400, y: 200 } },
];

export const ORG_EDGES = [
  { id: 'e1', source: 'root', target: 'col1', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e2', source: 'root', target: 'col2', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e3', source: 'col1', target: 'unit1', style: { stroke: '#94a3b8' } },
  { id: 'e4', source: 'col1', target: 'unit2', style: { stroke: '#94a3b8' } },
  { id: 'e5', source: 'col2', target: 'unit3', style: { stroke: '#94a3b8' } },
];
