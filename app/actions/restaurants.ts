"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
import { Restaurant } from "../hooks/menu";

export const getAllRestraunts = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/restaurants/all`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    console.log(res.data.data);
    return res.data.data as Restaurant[];
  } catch {
    return null;
  }
};
