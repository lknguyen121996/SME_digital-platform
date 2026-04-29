export interface StoreProductsListResponse {
  products: import('@/types/medusa').MedusaProduct[];
  count: number;
  offset: number;
  limit: number;
}

export interface StoreProductsRetrieveResponse {
  product: import('@/types/medusa').MedusaProduct;
}
