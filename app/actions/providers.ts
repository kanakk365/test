"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
import { Booking } from "./bookings";

export interface Provider {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  logo_image: string;
  banner_image: string;
  address: string;
  regions_available: string[];
  legal_name: string;
  legal_documents: string[];
  policies: {
    cancellation: number;
    advance_booking: number;
    advance_payment: number;
    refund: boolean;
  };
  service_id: string;
}

export const getAllProviders = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/serviceproviders/all`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Provider[];
  } catch {
    return null;
  }
};

export const getAllProvidersByRegion = async (region: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/providers/region/${region}`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Provider[];
  } catch {
    return null;
  }
};

export const createProvider = async (provider: Provider) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/serviceproviders/create`,
      [provider],
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Provider;
  } catch {
    return null;
  }
};

export const assignBookingToProvider = async (pid: string, bid: string) => {
  console.log("brr", pid, bid);
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/admin/bookings/assign`,
      {
        provider_id: pid,
        booking_id: bid,
      },
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    console.log(res.data);
    return res.data.data as Booking;
  } catch {
    return null;
  }
};
