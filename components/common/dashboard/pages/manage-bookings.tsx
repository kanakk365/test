import { AArrowUp, ArrowDownWideNarrow } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingList from "../feature/booking-list";

export default function ManageBookings() {
  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">Bookings</p>
          <div className="inline-flex items-center justify-end">
            <Button variant="secondary" className="mx-2">
              <AArrowUp /> By Name
            </Button>
            <Button variant="secondary">
              <ArrowDownWideNarrow /> By Date
            </Button>
          </div>
        </div>
        <BookingList />
      </div>
    </div>
  );
}
