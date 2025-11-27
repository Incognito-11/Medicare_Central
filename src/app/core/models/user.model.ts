export type UserRole = 'Director' | 'Manager' | 'User';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  token?: string;
}
