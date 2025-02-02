import { NextResponse } from "next/server";
import { accepted_otp, admin_phone, token } from "@/constants/config";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { phone, otp } = json;

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: "Phone and OTP are required" },
        { status: 400 },
      );
    }

    const p = "+91" + phone;

    if (!admin_phone.includes(p) || !accepted_otp.includes(otp)) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        token: token,
        message: "Login success",
      },
      type: "admin",
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 },
    );
  }
}
