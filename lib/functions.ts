import { signIn } from "next-auth/react";

export const loginUser = async (phone: string, otp: string) => {
  try {
    signIn("credentials", { phone, otp });
    return { message: "success", type: "success" };
  } catch {
    return { message: "Invalid Credentials", type: "error" };
  }
};
