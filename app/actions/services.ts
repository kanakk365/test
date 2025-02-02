"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";

export interface Service {
  service_id: string;
  service_name: string;
  service_description: string;
  policies: {
    cancellation: number;
    advance_booking: number;
    advance_payment: number;
    refund: number;
  };
  advance_payment: number;
  image: string;
}

export const getAllServices = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/services`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    return res.data.data as Service[];
  } catch {
    return null;
  }
};

export const getSingleServiceData = async (service_id: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/services/id/${service_id}`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Service;
  } catch {
    return null;
  }
};
