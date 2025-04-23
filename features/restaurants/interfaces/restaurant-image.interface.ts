export interface LocalImage {
  uri: string;
  fileName?: string;
  fileSize?: number;
  type?: string;
}

export interface ServerImage {
  id?: number;
  imageUrl: string;
  publicId: string;
  isMain?: boolean;
}

export type RestaurantImage = LocalImage | ServerImage;
