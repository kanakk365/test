import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Import Button component
import { Pencil } from "lucide-react"; // Import Pencil icon
import Image from "next/image";
import { VenueData } from "@/app/hooks/venues";
import { useDashboard } from "@/app/hooks/dashboard";
import { useVenueStore } from "@/app/hooks/venues";

interface VenueCardProps {
  venueData: VenueData;
  onUpdate?: (venueId: string) => void; // Add onUpdate prop
}

export default function VenueCard({ venueData }: VenueCardProps) {
  const { venue, service_provider } = venueData;
  const { setActive } = useDashboard();
  const { setSelectedVenue } = useVenueStore();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={venue.media[0] || "/placeholder.jpg"}
          alt={venue.name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl">{venue.name}</h3>
          <div className="flex items-center space-x-2">
            {venue.accessibility && (
              <Badge variant="secondary">Accessible</Badge>
            )}
            {venue.catering && <Badge variant="secondary">Catering</Badge>}
            {venue.dining && <Badge variant="secondary">Dining</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {venue.description}
        </p>

        <div className="flex items-center space-x-2">
          <Image
            src={service_provider.logo_image}
            alt={service_provider.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm font-medium">{service_provider.name}</span>
        </div>

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Capacity:</span> {venue.max_capacity}{" "}
            people
          </p>
          <p className="text-sm">
            <span className="font-medium">Price per slot:</span> $
            {venue.price_per_slot}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{venue.address}</p>
          <p className="text-sm font-medium">{service_provider.phone}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedVenue(venue.id);
            setActive("update-venue");
          }}
          className="ml-auto"
        >
          <Pencil className="h-4 w-4" />
          Update Venue
        </Button>
      </CardFooter>
    </Card>
  );
}
