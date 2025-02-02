export default function RecentBookings() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-6">
      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-4">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div>
              <p className="text-base font-bold text-gray-900">
                Recent Bookings
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Recent bookings made by customers
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <a
                href="#"
                title=""
                className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900"
              >
                See all Bookings
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6">
            <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
              <span className="text-xs font-medium text-green-900 bg-green-100 rounded-full inline-flex items-center px-2.5 py-1">
                <svg
                  className="-ml-1 mr-1.5 h-2.5 w-2.5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 8 8"
                >
                  <circle cx={4} cy={4} r={3} />
                </svg>
                Completed
              </span>
            </div>
            <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
              <p className="text-sm font-bold text-gray-900">
                Visa card **** 4831
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Card payment
              </p>
            </div>
            <div className="px-4 lg:py-4 sm:px-6">
              <p className="text-sm font-bold text-gray-900">$182.94</p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Jan 17, 2022
              </p>
            </div>
            <div className="px-4 lg:py-4 sm:px-6">
              <p className="mt-1 text-sm font-medium text-gray-500">Amazon</p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white border border-gray-200 rounded-xl lg:col-span-2">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <p className="text-base font-bold text-gray-900">
              Recent Wedzing Customers
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Recent customers who placed bookings
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between space-x-5">
              <div className="flex items-center flex-1 min-w-0">
                <img
                  className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png"
                  alt=""
                />
                <div className="flex-1 min-w-0 ml-4">
                  <p className="text-sm font-bold text-gray-900">
                    Jenny Wilson
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    w.lawson@example.com
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">$11,234</p>
                <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                  Austin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
