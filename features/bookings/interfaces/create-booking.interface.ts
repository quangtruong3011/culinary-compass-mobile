export interface CreateBookingDto {
    name: string;
    phone: string;
    email?: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    guests: number;
    restaurantId: number;
}