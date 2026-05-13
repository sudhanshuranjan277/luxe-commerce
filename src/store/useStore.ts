import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  qty: number;
  slug: string;
};

type State = {
  items: CartItem[];
  wishlist: string[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (id: string, size?: string, color?: string) => void;
  updateQty: (id: string, qty: number, size?: string, color?: string) => void;
  clear: () => void;
  toggleWishlist: (id: string) => void;
  setOpen: (v: boolean) => void;
};

const keyOf = (i: { id: string; size?: string; color?: string }) =>
  `${i.id}::${i.size ?? ""}::${i.color ?? ""}`;

export const useStore = create<State>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const k = keyOf(item);
          const exists = s.items.find((i) => keyOf(i) === k);
          if (exists) {
            return {
              items: s.items.map((i) =>
                keyOf(i) === k ? { ...i, qty: i.qty + item.qty } : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, item], isOpen: true };
        }),
      remove: (id, size, color) =>
        set((s) => ({
          items: s.items.filter((i) => keyOf(i) !== keyOf({ id, size, color })),
        })),
      updateQty: (id, qty, size, color) =>
        set((s) => ({
          items: s.items.map((i) =>
            keyOf(i) === keyOf({ id, size, color })
              ? { ...i, qty: Math.max(1, qty) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((x) => x !== id)
            : [...s.wishlist, id],
        })),
      setOpen: (v) => set({ isOpen: v }),
    }),
    { name: "luxe-store" },
  ),
);

export const cartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 18;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { subtotal, shipping, tax, total, count };
};
