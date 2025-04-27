export interface CreateOrEditUserDto {
  name?: string;
  email: string;
  phone?: string;
  birthOfDate?: Date;
  gender?: string;
  imageUrl?: string;
}
