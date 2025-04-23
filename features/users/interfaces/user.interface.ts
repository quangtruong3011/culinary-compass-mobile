export interface User {
  id: number;
  name?: string;
  email: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
  imageUrl?: string;
  roles: string[];
}
