import { create } from "zustand";
import {
  createFoodItem,
  Cuisine,
  getAllCuisines,
  getAllFoodItems,
  Item,
} from "../actions/foods";

interface ItemStore {
  items: Item[];
  filteredItems: Item[];
  filters: {
    cuisine: string;
    category: string;
    spiceLevel: string;
    priceRange: [number, number];
    type: string;
    timing: string;
  };
  setItems: (items: Item[]) => void;
  setFilters: (filters: Partial<ItemStore["filters"]>) => void;
  applyFilters: () => void;
  getItems: () => void;
  addItem: (item: Item) => void;
  createItem: (item: Item) => void;
  cuisines: Cuisine[];
  getCuisines: () => void;
}

export const useFoodStore = create<ItemStore>((set, get) => ({
  items: [],
  filteredItems: [],
  filters: {
    cuisine: "",
    category: "",
    spiceLevel: "",
    priceRange: [0, 1000],
    type: "",
    timing: "",
  },
  setItems: (items) => {
    set({ items, filteredItems: items });
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().applyFilters();
  },
  applyFilters: () => {
    set((state) => ({
      filteredItems: state.items.filter((item) => {
        const { filters } = state;
        return (
          (!filters.cuisine ||
            filters.cuisine === "all" ||
            item.cuisine_id === filters.cuisine) &&
          (!filters.category ||
            filters.category === "all" ||
            item.category === filters.category) &&
          (!filters.spiceLevel ||
            filters.spiceLevel === "all" ||
            item.spice_level === filters.spiceLevel) &&
          (!filters.type ||
            filters.type === "all" ||
            item.type === filters.type) &&
          (!filters.timing ||
            filters.timing === "all" ||
            item.timing === filters.timing) &&
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1]
        );
      }),
    }));
  },
  getItems: async () => {
    const r = await getAllFoodItems();
    if (r) {
      set({ items: r, filteredItems: r });
    }
  },
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  createItem: async (item) => {
    const r = await createFoodItem(item);
    if (r) {
      set({ cuisines: r });
    }
  },
  cuisines: [],
  getCuisines: async () => {
    const r = await getAllCuisines();
    if (r) {
      set({ cuisines: r });
    }
  },
}));
