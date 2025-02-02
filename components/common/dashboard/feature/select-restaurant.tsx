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
import { useState } from "react";
import { useMenuStore } from "@/app/hooks/menu";

interface RestaurantComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function RestaurantCombobox({
  value,
  onChange,
}: RestaurantComboboxProps) {
  const [open, setOpen] = useState(false);
  const { restaurants } = useMenuStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? restaurants.find((restaurant) => restaurant.id === value)?.name
            : "Select restaurant..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search restaurants..." />
          <CommandEmpty>No restaurant found.</CommandEmpty>
          <CommandGroup>
            {restaurants.map((restaurant) => (
              <CommandItem
                key={restaurant.id}
                value={restaurant.name}
                onSelect={() => {
                  onChange(restaurant.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === restaurant.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {restaurant.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
