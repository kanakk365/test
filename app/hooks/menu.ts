import { create } from "zustand";

export interface MenuItem {
  id?: string;
  cuisine_id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  type: string;
  category: string;
  spice_level: string;
  ingredients: string[];
  timing: string;
  tags: string[];
  region: string;
}

export interface Restaurant {
  id: string;
  cuisines_served: string[];
  name: string;
  provider_id: string;
  address: string;
  description: string;
  region: string;
  food_type: string[];
  live_food_counter: string;
  desert_counter: string;
  banner_image: string;
}

export interface Menu {
  id?: string;
  name: string;
  description: string;
  provider_id: string;
  restaurant_id: string;
  type: string;
  is_active: boolean;
  items: MenuItem[];
}

interface MenuState {
  menuData: Menu;
  menus: Menu[];
  setMenuData: (data: Partial<Menu>) => void;
  resetForm: () => void;
  setMenus: (menus: Menu[]) => void;
  availableItems: MenuItem[]; // New state
  setAvailableItems: (items: MenuItem[]) => void; // New action
  restaurants: Restaurant[];
  setRestaurants: (restuarants: Restaurant[]) => void;
}

const initialState: Menu = {
  name: "",
  description: "",
  provider_id: "",
  restaurant_id: "",
  type: "",
  is_active: true,
  items: [],
};

export const useMenuStore = create<MenuState>((set) => ({
  menuData: initialState,
  menus: [],
  setMenuData: (data) =>
    set((state) => ({ menuData: { ...state.menuData, ...data } })),
  resetForm: () => set({ menuData: initialState }),
  setMenus: (menus) => set({ menus }),
  availableItems: [], // New state
  setAvailableItems: (items) => set({ availableItems: items }),
  restaurants: [],
  setRestaurants: (restaurants: Restaurant[]) => set({ restaurants }),
}));
