export type ApartmentType = {
  title: string;
  location: string;
  size: string;
  price: string;
  image_url: string;
  apartment_url: string;
};

export type PaginationMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean
};