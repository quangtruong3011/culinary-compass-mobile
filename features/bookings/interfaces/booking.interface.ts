export interface Booking {
  id: number;
  userId: number;
  restaurantId: number;
  name: string;
  phone: string;
  email?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  isConfirmed: boolean;
}
