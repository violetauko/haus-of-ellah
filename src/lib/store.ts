// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface CartItem {
//   id: string | number;
//   price: number;
//   quantity: number;
//   [key: string]: any; // for other product properties
// }

// interface CartState {
//   items: CartItem[];
//   addItem: (product: Omit<CartItem, 'quantity'>) => void;
//   removeItem: (id: string | number) => void;
//   updateQuantity: (id: string | number, quantity: number) => void;
//   clearCart: () => void;
//   getTotal: () => number;
//   getItemCount: () => number;
// }

// export const useCart = create<CartState>()(
//   persist(
//     (set, get) => ({
//       items: [],
      
//       addItem: (product) => {
//         const items = get().items;
//         const existingItem = items.find(item => item.id === product.id);
        
//         if (existingItem) {
//           set({
//             items: items.map(item =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//             )
//           });
//         } else {
//           set({ items: [...items, { id: product.id, price: product.price, ...product, quantity: 1 }] });
//         }
//       },
      
//       removeItem: (id) => {
//         set({ items: get().items.filter(item => item.id !== id) });
//       },
      
//       updateQuantity: (id, quantity) => {
//         if (quantity <= 0) {
//           get().removeItem(id);
//         } else {
//           set({
//             items: get().items.map(item =>
//               item.id === id ? { ...item, quantity } : item
//             )
//           });
//         }
//       },
      
//       clearCart: () => set({ items: [] }),
      
//       getTotal: () => {
//         return get().items.reduce(
//           (total, item) => total + item.price * item.quantity,
//           0
//         );
//       },
      
//       getItemCount: () => {
//         return get().items.reduce((count, item) => count + item.quantity, 0);
//       }
//     }),
//     {
//       name: 'jewelry-cart'
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product } from './types';

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      
      removeItem: (id: string) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'jewelry-cart'
    }
  )
);