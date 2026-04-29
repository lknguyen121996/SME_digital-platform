"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sdk } from "@/lib/sdk";
import type { Cart, CartLineItem } from "@/types/medusa";

const CART_ID_KEY = "medusa_cart_id";

interface CartContextValue {
  cart: Cart | null;
  cartId: string | null;
  isLoading: boolean;
  error: string | null;
  createCart: () => Promise<string | null>;
  addItem: (item: CartLineItem) => Promise<void>;
  updateItem: (lineItemId: string, quantity: number) => Promise<void>;
  removeItem: (lineItemId: string) => Promise<void>;
  deleteCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within MedusaProvider");
  }
  return context;
}

interface MedusaProviderProps {
  children: ReactNode;
}

export function MedusaProvider({ children }: MedusaProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await sdk.store.cart.retrieve(id);
      if (response.cart) {
        setCart(response.cart as unknown as Cart);
        setCartId(id);
        setError(null);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError("Failed to load cart");
      // Clear invalid cart ID
      localStorage.removeItem(CART_ID_KEY);
      setCartId(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const storedCartId = localStorage.getItem(CART_ID_KEY);
    if (storedCartId) {
      // Use requestAnimationFrame to avoid cascading renders
      requestAnimationFrame(() => {
        fetchCart(storedCartId);
      });
    }
  }, [fetchCart]);

  const createCart = useCallback(async (): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await sdk.store.cart.create({});
      if (response.cart) {
        const newCart = response.cart as unknown as Cart;
        setCart(newCart);
        setCartId(newCart.id);
        localStorage.setItem(CART_ID_KEY, newCart.id);
        return newCart.id;
      }
      return null;
    } catch (err) {
      console.error("Failed to create cart:", err);
      setError("Failed to create cart");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (item: CartLineItem): Promise<void> => {
      if (!cartId) {
        const newCartId = await createCart();
        if (!newCartId) return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await sdk.store.cart.createLineItem(cartId!, {
          variant_id: item.variant_id,
          quantity: item.quantity,
        });
        if (response.cart) {
          setCart(response.cart as unknown as Cart);
        }
      } catch (err) {
        console.error("Failed to add item:", err);
        setError("Failed to add item to cart");
      } finally {
        setIsLoading(false);
      }
    },
    [cartId, createCart]
  );

  const updateItem = useCallback(
    async (lineItemId: string, quantity: number): Promise<void> => {
      if (!cartId) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await sdk.store.cart.updateLineItem(
          cartId,
          lineItemId,
          { quantity }
        );
        if (response.cart) {
          setCart(response.cart as unknown as Cart);
        }
      } catch (err) {
        console.error("Failed to update item:", err);
        setError("Failed to update cart item");
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const removeItem = useCallback(
    async (lineItemId: string): Promise<void> => {
      if (!cartId) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await sdk.store.cart.deleteLineItem(cartId, lineItemId);
        if (response.parent) {
          setCart(response.parent as unknown as Cart);
        }
      } catch (err) {
        console.error("Failed to remove item:", err);
        setError("Failed to remove item from cart");
      } finally {
        setIsLoading(false);
      }
    },
    [cartId]
  );

  const deleteCart = useCallback(async (): Promise<void> => {
    localStorage.removeItem(CART_ID_KEY);
    setCartId(null);
    setCart(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        error,
        createCart,
        addItem,
        updateItem,
        removeItem,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
