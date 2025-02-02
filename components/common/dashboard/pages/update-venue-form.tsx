import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useVenueStore } from "@/app/hooks/venues";
import { uploadFile } from "@/app/actions/uploads";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { SlotManager } from "../feature/venues/slot-manager";
import { RegionSingleCombobox } from "../feature/select-region-single";
import { ProviderCombobox } from "../feature/select-provider";

const venueSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(3, "Location is required"),
  price_per_slot: z.number().min(1, "Price must be greater than 0"),
  max_capacity: z.number().min(1, "Capacity must be greater than 0"),
  region: z.string().min(2, "Region is required"),
  type: z.string().min(2, "Type is required"),
  service_provider: z.string().min(3, "Service provider is required"),
  essentials: z.array(z.string()).min(1, "At least one essential is required"),
});

export function UpdateVenueForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { venueData, setVenueData, resetForm, selectedVenue, venues } =
    useVenueStore();
  const [newEssential, setNewEssential] = useState("");

  useEffect(() => {
    const temp = venues.find((venue) => venue.venue.id === selectedVenue);
    if (temp) {
      setVenueData(temp.venue);
    }
  }, [selectedVenue, venues, setVenueData]);

  const form = useForm<z.infer<typeof venueSchema>>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: venueData.name,
      address: venueData.address,
      description: venueData.description,
      location: venueData.location,
      price_per_slot: venueData.price_per_slot,
      max_capacity: venueData.max_capacity,
      region: venueData.region,
      type: venueData.type,
      service_provider: venueData.service_provider,
    },
  });

  const addEssential = () => {
    if (newEssential.trim()) {
      setVenueData({
        essentials: [...venueData.essentials, newEssential.trim()],
      });
      setNewEssential("");
    }
  };

  const removeEssential = (index: number) => {
    const newEssentials = [...venueData.essentials];
    newEssentials.splice(index, 1);
    setVenueData({ essentials: newEssentials });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const url = await uploadFile(file);
        if (url) {
          setVenueData({ media: [...venueData.media, url] });
          toast.success("File uploaded successfully");
        }
      } catch {
        toast.error("Error uploading file");
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof venueSchema>) => {
    try {
      setIsLoading(true);
      // Implement your submit logic here
      console.log({ ...data, ...venueData });
      toast.success("Venue created successfully");
      resetForm();
    } catch {
      toast.error("Error creating venue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Create New Venue</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter venue description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="price_per_slot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Slot</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Time Slots</FormLabel>
              <SlotManager
                value={venueData.slots}
                onChange={(slots) => setVenueData({ slots })}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Essentials</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newEssential}
                  onChange={(e) => setNewEssential(e.target.value)}
                  placeholder="Add essential item"
                />
                <Button type="button" onClick={addEssential}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {venueData.essentials.map((essential, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {essential}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEssential(index)}
                      className="h-4 w-4 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="max_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Capacity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter capacity"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter venue type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Region</FormLabel>
                <FormControl>
                  <RegionSingleCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service_provider"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Provider</FormLabel>
                <FormControl>
                  <ProviderCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormItem>
              <FormLabel>Accessibility</FormLabel>
              <FormControl>
                <Switch
                  checked={venueData.accessibility}
                  onCheckedChange={(checked) =>
                    setVenueData({ accessibility: checked })
                  }
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Catering</FormLabel>
              <FormControl>
                <Switch
                  checked={venueData.catering}
                  onCheckedChange={(checked) =>
                    setVenueData({ catering: checked })
                  }
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Dining</FormLabel>
              <FormControl>
                <Switch
                  checked={venueData.dining}
                  onCheckedChange={(checked) =>
                    setVenueData({ dining: checked })
                  }
                />
              </FormControl>
            </FormItem>
          </div>

          <div className="space-y-2">
            <FormLabel>Upload Images</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            {venueData.media.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {venueData.media.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Venue image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Venue"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
