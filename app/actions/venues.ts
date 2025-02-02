"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
import { CreateVenueReq, VenueData } from "../hooks/venues";

export const createVenue = async (venue: CreateVenueReq) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/admin/venues/create`,
      venue,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data;
  } catch {
    return null;
  }
};

export const getAllVenues = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/admin/venues`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    console.log(res.data.data);
    return res.data.data as VenueData[];
  } catch {
    return null;
  }
};
