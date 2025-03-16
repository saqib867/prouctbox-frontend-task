import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      data: [],
      totalAmount: 0,
      totalItems: 0,

      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.data.find((p) => p.id === product.id);

          let updatedCart;
          if (existingProduct) {
            updatedCart = state.data.map((p) =>
              p.id === product.id
                ? {
                    ...p,
                    quantity: p.quantity + product.quantity,
                    totalPrice: (p.quantity + product.quantity) * p.price,
                  }
                : p
            );
          } else {
            updatedCart = [...state.data, { ...product, totalPrice: product.price * product.quantity }];
          }

          return { data: updatedCart };
        });

        get().getCartTotal();
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          const updatedCart = state.data.map((p) =>
            p.id === id
              ? {
                  ...p,
                  quantity: Math.max(quantity || 1, 1),
                  totalPrice: Math.max(quantity || 1, 1) * p.price,
                }
              : p
          );

          return { data: updatedCart };
        });

        get().getCartTotal();
      },

      removeItem: (id) => {
        set((state) => ({
          data: state.data.filter((p) => p.id !== id),
        }));

        get().getCartTotal();
      },

      getCartTotal: () => {
        set((state) => ({
          totalAmount: state.data.reduce((total, item) => total + item.totalPrice, 0),
          totalItems: state.data.length,
        }));
      },

      clearCart: () => {
        set({ data: [], totalAmount: 0, totalItems: 0 });
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useCartStore;
