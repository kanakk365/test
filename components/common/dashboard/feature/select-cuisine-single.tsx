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
import { useFoodStore } from "@/app/hooks/foods";

interface CuisineComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function CuisineSingleCombobox({
  value,
  onChange,
}: CuisineComboboxProps) {
  const [open, setOpen] = useState(false);
  const { cuisines, getCuisines } = useFoodStore();

  useEffect(() => {
    if (!cuisines.length) {
      getCuisines();
    }
  }, []);

  const getSelectedCuisineText = () => {
    if (!value) return "Select cuisine...";

    const selectedCuisine = cuisines.find((cuisine) => cuisine.id === value);
    return selectedCuisine?.name || "Select cuisine...";
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
            {getSelectedCuisineText()}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search cuisines..." />
          <CommandEmpty>No cuisine found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {cuisines.map((cuisine) => (
              <CommandItem
                key={cuisine.id}
                value={cuisine.name}
                onSelect={() => {
                  onChange(cuisine.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="relative w-6 h-6"></div>
                  {cuisine.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === cuisine.id ? "opacity-100" : "opacity-0",
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
