"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";

export interface Region {
  id: string;
  name: string;
  state: string;
  city: string;
  description: string;
}

export const getAllRegions = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/regions/all`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    return res.data.data as Region[];
  } catch {
    return null;
  }
};
