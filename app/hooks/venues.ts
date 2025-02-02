import { create } from "zustand";
import { getAllVenues } from "../actions/venues";

interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
  media: string[];
  location: string;
  price_per_slot: number;
  max_capacity: number;
  accessibility: boolean;
  catering: boolean;
  dining: boolean;
}

interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  logo_image: string;
  address: string;
}

export interface VenueData {
  venue: Venue;
  service_provider: ServiceProvider;
}

export interface Slot {
  start_time: string;
  end_time: string;
}

export interface DaySlot {
  week_day: string;
  slots: Slot[];
}

export interface CreateVenueReq {
  name: string;
  address: string;
  description: string;
  location: string;
  slots: DaySlot[];
  price_per_slot: number;
  max_capacity: number;
  region: string;
  essentials: string[];
  accessibility: boolean;
  catering: boolean;
  dining: boolean;
  type: string;
  service_provider: string;
  media: string[];
}

interface VenueState {
  venueData: CreateVenueReq;
  setVenueData: (data: Partial<CreateVenueReq>) => void;
  resetForm: () => void;
  venues: VenueData[];
  setVenues: (venues: VenueData[]) => void;
  getVenues: () => void;
  selectedVenue: string;
  setSelectedVenue: (venueId: string) => void;
}

const initialState: CreateVenueReq = {
  name: "",
  address: "",
  description: "",
  location: "",
  slots: [],
  price_per_slot: 0,
  max_capacity: 0,
  region: "",
  essentials: [],
  accessibility: false,
  catering: false,
  dining: false,
  type: "",
  service_provider: "",
  media: [],
};

export const useVenueStore = create<VenueState>((set) => ({
  venueData: initialState,
  setVenueData: (data) =>
    set((state) => ({ venueData: { ...state.venueData, ...data } })),
  resetForm: () => set({ venueData: initialState }),
  venues: [],
  setVenues: (venues) => set({ venues }),
  getVenues: async () => {
    const r = await getAllVenues();
    if (r) {
      set({ venues: r });
    }
  },
  selectedVenue: "",
  setSelectedVenue: (venueId) => set({ selectedVenue: venueId }),
}));
