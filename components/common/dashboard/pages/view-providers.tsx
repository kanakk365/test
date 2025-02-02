import { useDashboard } from "@/app/hooks/dashboard";
import { Button } from "@/components/ui/button";
import { AArrowUp, ArrowDownWideNarrow } from "lucide-react";
import { useEffect } from "react";

export default function ViewProviders() {
  const { providers, getProviders } = useDashboard();
  useEffect(() => {
    getProviders();
  }, []);
  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">Your Providers</p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Have a look at all your service providers
            </p>
          </div>
          <div className="flex items-center justify-start mt-4 sm:justify-end sm:mt-0 sm:space-x-7">
            <div className="inline-flex items-center justify-end">
              <Button variant="secondary" className="mx-2">
                <AArrowUp /> By Name
              </Button>
              <Button variant="secondary">
                <ArrowDownWideNarrow /> By Date
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 lg:mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full lg:divide-gray-200 lg:divide-y">
                <thead className="hidden lg:table-header-group">
                  <tr>
                    <th className="py-3.5 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widest">
                      Name
                    </th>
                    <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                      Email Address
                    </th>
                    <th className="py-3.5 px-4 text-left text-xs uppercase tracking-widest font-medium text-gray-500">
                      Phone Number
                    </th>
                    <th className="relative py-3.5 pl-4 pr-4 md:pr-0">
                      <span className="sr-only"> Actions </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((provider, index) => {
                    return (
                      <tr className="bg-white" key={index}>
                        <td className="px-4 py-4 text-sm font-bold text-gray-900 align-top lg:align-middle whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
                              src={
                                provider.logo_image === ""
                                  ? "https://live.staticflickr.com/6137/6014732346_42f860bc42_b.jpg"
                                  : provider.logo_image
                              }
                              alt=""
                            />
                            {provider.name}
                          </div>
                          <div className="mt-1 space-y-2 font-medium pl-11 lg:hidden">
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              {provider.email}
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              {provider.phone}
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div className="flex items-center pt-3 space-x-4">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Edit Details
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <svg
                                  className="w-5 h-5 mr-2 -ml-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                Disable
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {provider.email}
                          </div>
                        </td>
                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {provider.phone}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 align-top lg:align-middle lg:text-left whitespace-nowrap">
                          {"                         "}
                        </td>
                        <td className="hidden px-4 py-4 lg:table-cell whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-gray-100 border border-gray-300 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none hover:text-white hover:border-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit Details
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <svg
                                className="w-5 h-5 mr-2 -ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Disable
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
