"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Product } from "@/types/product";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  priceRs: number;
  quantity: number;
  category?: string;          
  maxTesters?: number;        
  selectedTesters?: string[];
}

// A) CartContextType interface mein ye 3 lines add karo:
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;   // NAYA
  openCart: () => void;  // NAYA
  closeCart: () => void; // NAYA
  toggleTester: (cartItemId: string, testerId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "mparoma_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // NAYA

  // Cart ko localStorage se load karo (sirf ek dafa, page load par)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt data
    }
    setHydrated(true);
  }, []);

  // Jab bhi cart change ho, localStorage me save kar do
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          image: product.image,
          priceRs: product.priceRs,
          quantity,
          category: product.category,      
    maxTesters: product.maxTesters,  
    selectedTesters: [], 
        },
      ];
    });
    setIsCartOpen(true);
  }, []);


  
  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);
  
  const clearCart = useCallback(() => setItems([]), []);
  const toggleTester = useCallback((cartItemId: string, testerId: string) => {
  setItems((prev) =>
    prev.map((item) => {
      if (item.id !== cartItemId) return item;
      const current = item.selectedTesters || [];
      const limit = item.maxTesters || 0;

      if (current.includes(testerId)) {
        return { ...item, selectedTesters: current.filter((t) => t !== testerId) };
      }
      if (current.length >= limit) return item; // limit full — kuch mat karo
      return { ...item, selectedTesters: [...current, testerId] };
    })
  );
}, []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);


  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceRs * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleTester,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}