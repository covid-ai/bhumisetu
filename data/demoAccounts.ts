export type DemoAccountRole = 'admin' | 'citizen';

export interface DemoAccount {
  name: string;
  username: string;
  password: string;
  role: DemoAccountRole;
  title: string;
}

/** Demo-only credentials for the prototype. No real authentication is implied. */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  { name: 'Deepak', username: 'deepak.admin', password: 'DEEPAK123', role: 'admin', title: 'Admin / SDM' },
  { name: 'Krushna', username: 'krushna.admin', password: 'KRUSHNA123', role: 'admin', title: 'Admin / SDM' },
  { name: 'Shubham', username: 'shubham.citizen', password: 'SHUBHAM123', role: 'citizen', title: 'Citizen' },
  { name: 'Pawan', username: 'pawan.citizen', password: 'PAWAN123', role: 'citizen', title: 'Citizen' },
  { name: 'Preeti', username: 'preeti.citizen', password: 'PREETI123', role: 'citizen', title: 'Citizen' },
  { name: 'Shreya', username: 'shreya.citizen', password: 'SHREYA123', role: 'citizen', title: 'Citizen' },
];

export const getDemoAccount = (username: string, password: string) =>
  DEMO_ACCOUNTS.find((account) => account.username === username && account.password === password);
