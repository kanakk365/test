import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import RecentBookings from "../feature/recent-bookings";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Dash() {
  return (
    <div className="flex flex-col flex-1 overflow-x-hidden">
      <main>
        <div className="py-6">
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <div className="md:items-center md:flex">
              <p className="text-base font-bold text-gray-900">Hey Admin!</p>
              <p className="mt-1 text-base font-medium text-gray-500 md:mt-0 md:ml-2">
                Let&rsquo;s see what&rsquo;s happening with Wedzing today
              </p>
            </div>
          </div>
          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <div className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Todays Bookings
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900">10</p>
                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                        + 36%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 ml-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      This month bookings
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900">20</p>
                      <span className="inline-flex items-center text-sm font-semibold text-red-500">
                        - 14%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 ml-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 13l-5 5m0 0l-5-5m5 5V6"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Total active providers
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900">16</p>
                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                        + 36%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 ml-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl">
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      current month sales
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-gray-900">₹33,493</p>
                      <span className="inline-flex items-center text-sm font-semibold text-green-500">
                        + 36%
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3 ml-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 11l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
                <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-4">
                  <div className="px-4 pt-5 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between">
                      <p className="text-base font-bold text-gray-900 lg:order-1">
                        Bookings Report
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm lg:order-2 2xl:order-3 md:order-last hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <svg
                          className="w-4 h-4 mr-1 -ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Export to CSV
                      </button>
                      <nav className="flex items-center justify-center mt-4 space-x-1 2xl:order-2 lg:order-3 md:mt-0 lg:mt-4 sm:space-x-2 2xl:mt-0">
                        <a
                          href="#"
                          title=""
                          className="px-2 py-2 text-xs font-bold text-gray-900 transition-all border border-gray-900 rounded-lg sm:px-4 hover:bg-gray-100 dration-200"
                        >
                          {" "}
                          12 Months{" "}
                        </a>
                        <a
                          href="#"
                          title=""
                          className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"
                        >
                          {" "}
                          6 Months{" "}
                        </a>
                        <a
                          href="#"
                          title=""
                          className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"
                        >
                          {" "}
                          30 Days{" "}
                        </a>
                        <a
                          href="#"
                          title=""
                          className="px-2 py-2 text-xs font-bold text-gray-500 transition-all border border-transparent rounded-lg sm:px-4 hover:bg-gray-100 dration-200"
                        >
                          {" "}
                          7 Days{" "}
                        </a>
                      </nav>
                    </div>
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent />}
                        />
                        <defs>
                          <linearGradient
                            id="fillDesktop"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillMobile"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          fillOpacity={0.4}
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          fillOpacity={0.4}
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>
                <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <p className="text-base font-bold text-gray-900">
                        Providers Leaderboard
                      </p>
                      <div className="mt-4 sm:mt-0">
                        <div>
                          <label htmlFor="" className="sr-only">
                            {" "}
                            Duration{" "}
                          </label>
                          <select
                            name=""
                            id=""
                            className="block w-full py-0 pl-0 pr-10 text-base border-none rounded-lg focus:outline-none focus:ring-0 sm:text-sm"
                          >
                            <option>Last 7 days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Vinesh Catering
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            10 Bookings
                          </p>
                        </div>
                        <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Bhavani Venues
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            12 Bookings
                          </p>
                        </div>
                        <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Aakash Catering
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            20 Bookings
                          </p>
                        </div>
                        <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Lisa Catering
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            40 Bookings
                          </p>
                        </div>
                        <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            Vivek Catering
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            10 Bookings
                          </p>
                        </div>
                        <div className="mt-2 bg-gray-200 h-1.5 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 bg-indigo-600 rounded-full w-[60%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <RecentBookings />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
