export interface Booking {
  id: number;
  userId: number;
  name: string;
  phone: string;
  email?: string;
  restaurantId: number;
  restaurantName?: string;
  date: Date;
  createAt: Date;
  startTime: Date;
  endTime: Date;
  guests: number;
  status: string;
}
