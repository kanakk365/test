import { useEffect } from "react";
import { ProviderCombobox } from "../feature/select-provider";
import { StatusCombobox } from "./select-status";
import { useDashboard } from "@/app/hooks/dashboard";

export default function BookingList() {
  const {
    bookings,
    getBookings,
    assignProvider,
    setBookingProvider,
    updateBookingStatus,
    assignStatus,
    activePopoverId,
    setActivePopoverId,
    requestPayment,
    paymentAmount,
    setPaymentAmount,
  } = useDashboard();

  const togglePopover = (bookingId: string) => {
    if (activePopoverId === bookingId) {
      setActivePopoverId(null);
    } else {
      setActivePopoverId(bookingId);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activePopoverId && !(event.target as Element).closest(".relative")) {
        setActivePopoverId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activePopoverId, setActivePopoverId]);

  return (
    <div className="flex flex-col mt-4 lg:mt-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table className="min-w-full lg:divide-y lg:divide-gray-200">
            <thead className="hidden lg:table-header-group">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium text-gray-500 sm:pl-6 md:pl-0">
                  <div className="flex items-center">
                    ID
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                  <div className="flex items-center">
                    Provider Assigned
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                  <div className="flex items-center">
                    Customer Name
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                  <div className="flex items-center">
                    Date
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                  <div className="flex items-center">
                    Advance paid
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                  <div className="flex items-center">
                    Status
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
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                  <span className="sr-only"> Actions </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">
                      #{booking.booking.booking_id}
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                      <div className="inline-flex items-center">
                        <ProviderCombobox
                          value={booking.service_provider.id}
                          onChange={async (pid: string) => {
                            assignProvider(pid, booking.booking.booking_id);
                            setBookingProvider(booking.booking.booking_id, pid);
                          }}
                        />
                      </div>
                      <div className="space-y-1 lg:hidden pl-11">
                        <p className="text-sm font-medium text-gray-500">
                          #{booking.booking.booking_id}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          {new Date(booking.booking.booking_date).toUTCString()}
                        </p>
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                      {booking.user.name}
                    </td>
                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                      {new Date(booking.booking.booking_date).toUTCString()}
                    </td>
                    <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">
                      ₹{booking.booking.advance_paid}
                    </td>
                    <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                      <StatusCombobox
                        value={booking.booking.status}
                        onChange={async (status: string) => {
                          try {
                            updateBookingStatus(
                              booking.booking.booking_id,
                              status,
                            );
                            assignStatus(booking.booking.booking_id, status);
                          } catch (error) {
                            console.error("Error in onChange handler:", error);
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            togglePopover(booking.booking.booking_id)
                          }
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

                        {activePopoverId === booking.booking.booking_id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <div className="px-4 py-2">
                                <input
                                  type="number"
                                  value={paymentAmount}
                                  onChange={(e) =>
                                    setPaymentAmount(parseInt(e.target.value))
                                  }
                                  placeholder="Enter amount"
                                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                              </div>
                              <button
                                onClick={() => {
                                  if (paymentAmount) {
                                    requestPayment(
                                      booking.booking.booking_id,
                                      paymentAmount,
                                      booking.user.id,
                                    );
                                    setPaymentAmount(0); // Reset amount after request
                                  }
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                              >
                                <svg
                                  className="mr-3 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                  />
                                </svg>
                                Request Payment
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="mt-1 lg:hidden">
                          <p>₹{booking.booking.advance_paid}</p>
                          <div className="inline-flex items-center justify-end mt-1">
                            <svg
                              className="mr-1.5 h-2.5 w-2.5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            {booking.booking.status}
                          </div>
                        </div>
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
  );
}
