"use server";

import axios from "axios";
import { auth } from "@/auth";
import { config } from "@/constants/config";
export interface Cuisine {
  id: string;
  serviceProvider: string;
  name: string;
  description: string;
  bannerImage: string;
  type: string;
  region: string;
}

export const createCuisine = async (cuisine: Cuisine) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/cuisines/create`,
      cuisine,
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

export const getAllCuisines = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/cuisines/all`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    return res.data.data as Cuisine[];
  } catch {
    return null;
  }
};

export const getAllCuisinesByRegion = async (region: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/cuisines/${region}/all`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Cuisine[];
  } catch {
    return null;
  }
};

export interface Item {
  id: string;
  cuisine_id: string;
  category: string;
  spice_level: string;
  ingredients: string[];
  name: string;
  description: string;
  price: number;
  images: string[];
  type: string;
  timing: string;
  tags: string[];
  region: string;
  standard_serving_quantity: number;
  standard_serving_unit: string;
  standard_serving_price: number;
}

export const createFoodItem = async (item: Item) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.post(
      `${config.api}/${config.api_v}/items/create`,
      item,
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

export const getAllFoodItems = async () => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(`${config.api}/${config.api_v}/items/all`, {
      headers: {
        "X-Karma-Admin-Auth": `${session.user.jwt}`,
      },
    });
    return res.data.data as Item[];
  } catch {
    return null;
  }
};

export const getAllFoodItemsByRegion = async (region: string) => {
  const session = await auth();
  if (!session?.user.jwt) {
    return null;
  }
  try {
    const res = await axios.get(
      `${config.api}/${config.api_v}/cuisines/${region}/all`,
      {
        headers: {
          "X-Karma-Admin-Auth": `${session.user.jwt}`,
        },
      },
    );
    return res.data.data as Item[];
  } catch {
    return null;
  }
};
