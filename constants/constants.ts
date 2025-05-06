export const BASE_URL = "http://192.168.1.190:3000";

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const MAX_IMAGES = 6;
export const PAGE = 1;
export const PAGE_SIZE = 10;

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export const TABLE_STATUS = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  RESERVED: "reserved",
} as const;
