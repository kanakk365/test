"use server";

import { accepted_otp, admin_phone, token } from "@/constants/config";

export interface LoginResponse {
  success: boolean;
  data: {
    account_exists: boolean;
    test_phone: boolean;
  };
  message: string;
}

export const login = async (phone: string) => {
  try {
    const res: LoginResponse = {
      success: true,
      data: {
        account_exists: true,
        test_phone: true,
      },
      message: `OTP sent successfully to ${phone}`,
    };
    return res;
  } catch {
    return { message: "Invalid Credentials", type: "error" };
  }
};

export interface VerifyOTPResponse {
  success: boolean;
  data: {
    account_exists: boolean;
    token: string;
  };
  message: string;
}

export const verifyOTP = async (phone: string, otp: string) => {
  try {
    const p = "+91" + phone;
    if (!admin_phone.includes(p) && !accepted_otp.includes(otp)) {
      const res: VerifyOTPResponse = {
        success: true,
        data: {
          account_exists: true,
          token: token,
        },
        message: `OTP ${otp} verified successfully`,
      };
      return res;
    } else {
      const res: VerifyOTPResponse = {
        success: false,
        data: {
          account_exists: false,
          token: "",
        },
        message: `OTP ${otp} verified successfully`,
      };
      return res;
    }
  } catch {
    return { message: "Invalid Credentials", type: "error" };
  }
};
