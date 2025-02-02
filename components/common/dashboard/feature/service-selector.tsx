import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useDashboard } from "@/app/hooks/dashboard";

interface ServiceComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceCombobox({ value, onChange }: ServiceComboboxProps) {
  const [open, setOpen] = useState(false);
  const { services, getServices } = useDashboard();

  useEffect(() => {
    if (!services.length) {
      getServices();
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sky-50"
        >
          <div className="flex items-center gap-2">
            {value ? (
              <>
                {services.find((service) => service.service_id === value)
                  ?.image && (
                  <div className="relative w-6 h-6">
                    <Image
                      src={
                        services.find((service) => service.service_id === value)
                          ?.image || ""
                      }
                      alt="service icon"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                )}
                {
                  services.find((service) => service.service_id === value)
                    ?.service_name
                }
              </>
            ) : (
              "Select a service..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search services..." />
          <CommandEmpty>No service found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {services.map((service) => (
              <CommandItem
                key={service.service_id}
                value={service.service_name}
                onSelect={() => {
                  onChange(service.service_id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="relative w-6 h-6">
                    <Image
                      src={service.image}
                      alt={service.service_name}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  {service.service_name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === service.service_id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
