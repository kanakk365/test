import { create } from "zustand";
import {
  assignBookingToProvider,
  getAllProviders,
  Provider,
} from "../actions/providers";
import {
  BookingsData,
  getAllBookings,
  getAllTodaysBookings,
  reqExtraPay,
  updateStatus,
} from "../actions/bookings";
import { getAllServices, Service } from "../actions/services";
import { getAllRegions, Region } from "../actions/regions";

import Dash from "@/components/common/dashboard/pages/dash";
import ViewProviders from "@/components/common/dashboard/pages/view-providers";
import ManageBookings from "@/components/common/dashboard/pages/manage-bookings";
import CreateProvider from "@/components/common/dashboard/pages/create-provider";
import ManageServices from "@/components/common/dashboard/pages/manage-services";
import ViewVenues from "@/components/common/dashboard/pages/view-venues";
import CreateVenuePage from "@/components/common/dashboard/pages/create-venue";
import ViewMenus from "@/components/common/dashboard/pages/view-menus";
import { UpdateVenueForm } from "@/components/common/dashboard/pages/update-venue-form";
import { CreateMenuForm } from "@/components/common/dashboard/pages/create-menu-form";
import FoodItemsListPage from "@/components/common/dashboard/pages/services/food/food-items-list";
import ViewPackage from "@/components/common/dashboard/pages/services/package/view-package";
import CreatePackagePage from "@/components/common/dashboard/pages/services/package/create-package";

export const COMPONENT_MAP = {
  dash: Dash,
  "view-providers": ViewProviders,
  "manage-bookings": ManageBookings,
  "create-provider": CreateProvider,
  "manage-services": ManageServices,
  venues: ViewVenues,
  "create-venue": CreateVenuePage,
  "update-venue": UpdateVenueForm,
  menus: ViewMenus,
  "create-menu": CreateMenuForm,
  "food-items-list": FoodItemsListPage,
  package: ViewPackage,
  "create-package": CreatePackagePage
} as const;

export interface DashboardState {
  active: string;
  setActive: (active: string) => void;
  providers: Provider[];
  getProviders: () => void;
  bookings: BookingsData[];
  getBookings: () => void;
  getTodaysBookings: () => void;
  services: Service[];
  getServices: () => void;
  regions: Region[];
  region: string;
  setRegion: (region: string) => void;
  getRegions: () => void;
  assignProvider: (id: string, bid: string) => void;
  setBookingProvider: (booking_id: string, provider_id: string) => void;
  assignStatus: (booking_id: string, status: string) => void;
  updateBookingStatus: (booking_id: string, status: string) => void;
  activePopoverId: string | null;
  setActivePopoverId: (id: string | null) => void;
  requestPayment: (bookingId: string, amount: number, userID: string) => void;
  paymentAmount: number;
  setPaymentAmount: (amount: number) => void;
}

export const useDashboard = create<DashboardState>((set, get) => ({
  active: "dash",
  setActive: (active) => set({ active }),
  providers: [],
  getProviders: async () => {
    const r = await getAllProviders();
    if (r) {
      set({ providers: r });
    }
  },
  setBookingProvider: (booking_id, provider_id) => {
    console.log(booking_id, provider_id);
    const bookings = get().bookings;
    const booking = bookings.find((b) => b.booking.booking_id === booking_id);
    if (booking) {
      booking.service_provider.id = provider_id;
      set({ bookings });
    }
  },
  bookings: [],
  getBookings: async () => {
    const r = await getAllBookings();
    if (r) {
      set({ bookings: r });
    }
  },
  getTodaysBookings: async () => {
    const r = await getAllTodaysBookings();
    if (r) {
      set({ bookings: r });
    }
  },
  services: [],
  getServices: async () => {
    const r = await getAllServices();
    if (r) {
      set({ services: r });
    }
  },
  regions: [],
  region: "akbkasdj69",
  setRegion: (region) => set({ region }),
  getRegions: async () => {
    const r = await getAllRegions();
    if (r) {
      set({ regions: r });
    }
  },
  assignProvider: async (id, bid) => {
    const r = await assignBookingToProvider(id, bid);
    const new_providers = await getAllProviders();
    if (r && new_providers) {
      set({ providers: new_providers });
    }
  },
  updateBookingStatus: async (booking_id, status) => {
    console.log(booking_id, status);
    const r = await updateStatus(booking_id, status);
    if (r) {
      const bookings = get().bookings;
      const booking = bookings.find((b) => b.booking.booking_id === booking_id);
      if (booking) {
        booking.booking.status = status;
        set({ bookings });
      }
    }
  },
  assignStatus: async (booking_id, status) => {
    console.log(booking_id, status);
    const bookings = get().bookings;
    const booking = bookings.find((b) => b.booking.booking_id === booking_id);
    if (booking) {
      booking.booking.status = status;
      set({ bookings });
    }
  },
  activePopoverId: null,

  setActivePopoverId: (id) => {
    set({ activePopoverId: id });
  },

  requestPayment: async (bookingId, amount, userId) => {
    try {
      reqExtraPay(bookingId, amount, userId);
      console.log(`Payment requested for booking ${bookingId}`);
      set({ activePopoverId: null });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  },
  paymentAmount: 0,
  setPaymentAmount: (amount) => set({ paymentAmount: amount }),
}));
