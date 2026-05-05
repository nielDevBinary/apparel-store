import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../type";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: string) => number;
  addToCart: (itemToAdd: CartItem) => void;
  increaseItemQuantity: (variantId: string) => void;
  decreaseCartQuantity: (variantId: string) => void;
  removeFromCart: (variantId: string) => void;
  totalAmount: number;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  function getItemQuantity(variantId: string) {
    return (
      cartItems.find((item) => item.variantId === variantId)?.quantity || 0
    );
  }

  function addToCart(itemToAdd: CartItem) {
    setCartItems((currItems) => {
      const existing = currItems.find(
        (item) => item.variantId === itemToAdd.variantId,
      );

      if (existing) {
        // calculamos cuanto espacio queda
        const availableSpace = existing.stock - existing.quantity;

        // si ya no hay espacio, no hacemos nada
        if (availableSpace <= 0) return currItems;

        return currItems.map((item) =>
          item.variantId === itemToAdd.variantId
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item,
        );
      }

      return [...currItems, itemToAdd];
    });
    setIsOpen(true);
  }

  function increaseItemQuantity(variantId: string) {
    setCartItems((currItems) =>
      currItems.map((item) => {
        if (item.variantId !== variantId) return item;

        const availableSpace = item.stock - item.quantity;
        if (availableSpace <= 0) return item;

        return { ...item, quantity: item.quantity + 1 };
      }),
    );
  }

  function decreaseCartQuantity(variantId: string) {
    setCartItems((currItems) => {
      const existing = currItems.find((item) => item.variantId === variantId);

      if (existing?.quantity === 1) {
        return currItems.filter((item) => item.variantId !== variantId);
      }

      return currItems.map((item) =>
        item.variantId === variantId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }

  function removeFromCart(variantId: string) {
    setCartItems((currItems) =>
      currItems.filter((item) => item.variantId !== variantId),
    );
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        addToCart,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        isOpen,
        setIsOpen,
        totalAmount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
