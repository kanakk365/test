"use client";
import { login } from "@/app/actions/auth";
import { useAuth } from "@/app/hooks/auth";
import Header from "@/components/common/header";
import { loginUser } from "@/lib/functions";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const { step, setStep, phone, otp, setOtp, setPhone } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const message = params.get("message");
    if (message) {
      setError(message);
      toast.error(message);
    }
    if (error) {
      toast.error(error);
      setError("");
    }
  }, []);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(phone);
      setStep("otp");
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Verifying OTP:", otp);
      const res = await loginUser(phone, otp);
      console.log(res);
      if (res.type === "error") {
        setError(res.message);
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <section className="py-12 bg-gray-950 sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36">
            <div>
              <Image
                className="object-cover w-full h-full rounded-2xl"
                src="https://static.tildacdn.com/tild3530-3830-4638-a665-373735636232/admin_panel.png"
                alt="Login Illustration"
                width={500}
                height={500}
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back
              </h2>
              <p className="mt-4 text-base font-normal leading-7 text-gray-400 lg:text-lg lg:mt-6 lg:leading-8">
                Login to Wedzing Admin Console
              </p>
              <div className="mt-12">
                <AnimatePresence>
                  {step === "phone" && (
                    <motion.form
                      key="phoneForm"
                      onSubmit={handlePhoneSubmit}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm font-normal text-gray-200"
                        >
                          Phone Number
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="9181273287"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="block w-full px-6 py-4 text-base font-normal text-white placeholder-gray-400 bg-transparent border border-gray-700 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-gray-900 w-full ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? "Sending OTP..." : "Send OTP"}
                      </button>
                    </motion.form>
                  )}

                  {step === "otp" && (
                    <motion.form
                      key="otpForm"
                      onSubmit={handleOtpSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="otp"
                          className="text-sm font-normal text-gray-200"
                        >
                          Enter OTP
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            name="otp"
                            id="otp"
                            placeholder="******"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="block w-full px-6 py-4 text-base font-normal text-white placeholder-gray-400 bg-transparent border border-gray-700 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center justify-center px-12 py-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-gray-900 w-full ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep("phone")}
                        className="text-sm font-semibold text-blue-500 hover:underline w-full text-center"
                      >
                        Back to Phone Input
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
