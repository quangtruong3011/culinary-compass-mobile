export interface CreateOrEditBookingDto {
  userId: number;
  restaurantId: number;
  name: string;
  phone: string;
  email?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
}
