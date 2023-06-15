export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
