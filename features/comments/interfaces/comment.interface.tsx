export interface Comment {
  id: number;
  bookingId: number;
  userName: string;
  imageUrl?: string;
  content: string;
  updatedAt: Date;
  likeCount: number;
}
