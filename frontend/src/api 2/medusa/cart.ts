import { Cart, CartLineItem } from "@/types/medusa";
import { sdk } from "@/lib/sdk";

/**
 * Fetch cart by ID
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.retrieve(cartId);
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error("Failed to get cart:", error);
    return null;
  }
}

/**
 * Create a new cart
 */
export async function createCart(): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.create({});
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error("Failed to create cart:", error);
    return null;
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  cartId: string,
  item: CartLineItem
): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.createLineItem(cartId, {
      variant_id: item.variant_id,
      quantity: item.quantity,
    });
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return null;
  }
}

/**
 * Update cart line item quantity
 */
export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.updateLineItem(cartId, lineItemId, {
      quantity,
    });
    return (response.cart as unknown as Cart) || null;
  } catch (error) {
    console.error("Failed to update cart item:", error);
    return null;
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<Cart | null> {
  try {
    const response = await sdk.store.cart.deleteLineItem(cartId, lineItemId);
    // deleteLineItem returns { deleted: true, parent: cart }
    return (response.parent as unknown as Cart) || null;
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return null;
  }
}
