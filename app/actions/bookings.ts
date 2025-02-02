"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
import { Provider } from "./providers";

export interface Booking {
  booking_id: string;
  user_id: string;
  service_provider_id: string;
  service_id: string;
  venue_id: string;
  booking_date: string;
  status: string;
  advance_paid: number;
  plan_id: string;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  region: string;
  address: string;
  password: string;
  name: string;
  age: number;
  profile_image: string;
  location: string;
  referral_code: string;
}

export interface BookingsData {
  user: User;
  booking: Booking;
  service_provider: Provider;
}

export const getAllTodaysBookings = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/bookings/today`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as BookingsData[];
  } catch {
    return null;
  }
};

export const getAllBookings = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/admin/bookings`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as BookingsData[];
  } catch {
    return null;
  }
};

export const updateStatus = async (booking_id: string, status: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.put(
      `${config.api}/${config.api_v}/bookings/provider/` + booking_id,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`, // Changed this line
        },
      },
    );
    return res.data.data as BookingsData[];
  } catch {
    return null;
  }
};

export const reqExtraPay = async (
  booking_id: string,
  amount: number,
  user_id: string,
) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.put(
      `${config.api}/${config.api_v}/admin/bookings/request_pay`,
      {
        amount,
        booking_id,
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session.user.jwt}`, // Changed this line
        },
      },
    );
    return res.data;
  } catch {
    return null;
  }
};
