export interface User {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  gender?: string;
  birthOfDate?: Date;
  imageUrl?: string;
  roles: string[];
}
