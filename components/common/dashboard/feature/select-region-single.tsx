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
import { useDashboard } from "@/app/hooks/dashboard";

interface RegionComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function RegionSingleCombobox({ value, onChange }: RegionComboboxProps) {
  const [open, setOpen] = useState(false);
  const { regions, getRegions } = useDashboard();

  useEffect(() => {
    if (!regions.length) {
      getRegions();
    }
  }, []);

  const getSelectedRegionsText = () => {
    if (!value.length) return "Select regions...";

    const selectedRegions = regions
      .filter((region) => value.includes(region.id))
      .map((region) => region.name);

    if (selectedRegions.length <= 2) {
      return selectedRegions.join(", ");
    }
    return `${selectedRegions.length} regions selected`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sky-50"
        >
          <div className="flex items-center gap-2 truncate">
            {getSelectedRegionsText()}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search regions..." />
          <CommandEmpty>No region found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {regions.map((region) => (
              <CommandItem
                key={region.id}
                value={region.name}
                onSelect={() => onChange(region.id)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="relative w-6 h-6"></div>
                  {region.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value.includes(region.id) ? "opacity-100" : "opacity-0",
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
