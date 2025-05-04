export interface CreateOrEditBookingDto {
  restaurantId: number;
  name: string;
  phone: string;
  email?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  note?: string;
  isCommented: boolean;
}
