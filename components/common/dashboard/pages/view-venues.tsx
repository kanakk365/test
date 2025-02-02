"use client";

import { useEffect } from "react";
import { useVenueStore } from "@/app/hooks/venues";
import VenueCard from "../feature/venues/venue-card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/app/hooks/dashboard";

export default function ViewVenues() {
  const { venues, getVenues } = useVenueStore();
  const { setActive } = useDashboard();

  useEffect(() => {
    getVenues();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-8">Available Venues</h1>
      <div className="flex gap-1">
        <Button
          className="mx-8 my-4"
          variant="secondary"
          onClick={() => setActive("create-venue")}
        >
          Create Venue
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venueData) => (
          <VenueCard key={venueData.venue.id} venueData={venueData} />
        ))}
      </div>
    </div>
  );
}
