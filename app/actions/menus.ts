"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
import { Menu } from "@/app/hooks/menu";
export interface CreateMenuReq {
  id: string;
  name: string;
  description: string;
  provider_id: string;
  restaurant_id: string;
  type: string;
  is_active: boolean;
  items: string[];
}

export const createMenu = async (menu: CreateMenuReq) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  console.log(menu, session?.user.jwt);
  try {
    const formData = new FormData();
    formData.append("menus", JSON.stringify([menu]));
    const res = await axios.post(
      `${config.api}/${config.api_v}/menus/create`,
      formData,
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

export const getAllMenus = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/menus/all`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    return res.data.data as Menu[];
  } catch {
    return null;
  }
};
