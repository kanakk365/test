"use client";
import { useDashboard } from "@/app/hooks/dashboard";
import { Button } from "@/components/ui/button";
import { CircleCheck, CirclePlus, Pen } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function ManageServices() {
  const { services, getServices } = useDashboard();
  useEffect(() => {
    getServices();
  }, []);
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-center lg:justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Wedzing Active Services
          </h2>
          <div className="hidden lg:flex">
            <Button variant="secondary">
              <CirclePlus />
              Create new service
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:mt-10">
          {services.map((service, index) => {
            return (
              <div
                className="relative overflow-hidden bg-white border border-gray-200 rounded-xl group"
                key={index}
              >
                <div className="absolute z-10 top-3 right-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center text-rose-600 hover:text-rose-500"
                  >
                    <CircleCheck />
                  </button>
                </div>
                <div className="relative">
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      className="object-cover w-full h-full p-4"
                      src={service.image}
                      alt=""
                    />
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-xs font-medium tracking-widest text-gray-500 uppercase">
                      Active
                    </p>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <a href="#" title="">
                        {service.service_name}
                        <span className="absolute inset-0" aria-hidden="true" />
                      </a>
                    </h3>
                    <p className="mt-5 text-sm font-bold text-gray-900">
                      {service.service_description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 transition-all duration-200 translate-y-full group-hover:translate-y-0">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-gray-900"
                    onClick={() =>
                      redirect(
                        `/dashboard/service/questions/${service.service_id}`,
                      )
                    }
                  >
                    <Pen />
                    Edit this service
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center lg:hidden">
          <Button variant="secondary">
            <CirclePlus />
            Create new service
          </Button>
        </div>
      </div>
    </section>
  );
}
