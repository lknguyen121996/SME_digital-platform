import { MedusaProduct } from "@/types/medusa";
import { sdk } from "@/lib/sdk";
import { MOCK_PRODUCTS } from "./client";

/**
 * Fetch all products from Medusa store
 */
export async function getProducts(): Promise<MedusaProduct[]> {
  try {
    const response = await sdk.store.product.list();
    return (response.products || []) as unknown as MedusaProduct[];
  } catch (error) {
    console.error("Failed to fetch products, using mock data:", error);
    return MOCK_PRODUCTS;
  }
}

/**
 * Fetch a single product by handle
 */
export async function getProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  try {
    const response = await sdk.store.product.list({ handle });
    return (response.products?.[0] as unknown as MedusaProduct) || null;
  } catch (error) {
    console.error("Failed to fetch product by handle, using mock data:", error);
    return MOCK_PRODUCTS.find((p) => p.handle === handle) || null;
  }
}

/**
 * Fetch products by collection
 */
export async function getProductsByCollection(
  collectionId: string
): Promise<MedusaProduct[]> {
  try {
    const response = await sdk.store.product.list({
      collection_id: [collectionId],
    });
    return (response.products || []) as unknown as MedusaProduct[];
  } catch (error) {
    console.error(
      "Failed to fetch products by collection, using mock data:",
      error
    );
    return MOCK_PRODUCTS;
  }
}
