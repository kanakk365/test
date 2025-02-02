import { create } from "zustand";

interface FormState {
  formData: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    logo_image: string;
    banner_image: string;
    address: string;
    regions_available: string[];
    legal_name: string;
    legal_documents: string[];
    policies: {
      cancellation: number;
      advance_booking: number;
      advance_payment: number;
      refund: boolean;
    };
    service_id: string;
  };
  setFormData: (data: Partial<FormState["formData"]>) => void;
  resetForm: () => void;
}

const initialState = {
  id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  logo_image: "",
  banner_image: "",
  address: "",
  regions_available: [],
  legal_name: "",
  legal_documents: [],
  policies: {
    cancellation: 0,
    advance_booking: 0,
    advance_payment: 0,
    refund: false,
  },
  service_id: "",
};

export const useFormStore = create<FormState>((set) => ({
  formData: initialState,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetForm: () => set({ formData: initialState }),
}));
