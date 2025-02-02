import { create } from "zustand";

export interface AuthState {
  step: "phone" | "otp";
  setStep: (step: "phone" | "otp") => void;
  phone: string;
  setPhone: (phone: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
  step: "phone",
  setStep: (step) => set({ step }),
  phone: "",
  setPhone: (phone) => set({ phone }),
  otp: "",
  setOtp: (otp) => set({ otp }),
}));
