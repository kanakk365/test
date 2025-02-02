import { useState } from "react";
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

interface StatusComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses = [
  {
    id: "created",
    label: "Created",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
  },
  {
    id: "accepted",
    label: "Accepted",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "pending_advance",
    label: "Advance Requested",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: "advance_received",
    label: "Advance Received",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: "payment_requested",
    label: "Payment Requested",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "payment_received",
    label: "Payment Received",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    id: "completed",
    label: "Completed",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
];

export function StatusCombobox({ value, onChange }: StatusComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedStatus = statuses.find((status) => status.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            {value ? (
              <div
                className={cn(
                  "px-2 py-1 rounded-full text-sm font-medium",
                  // selectedStatus?.bgColor,
                  selectedStatus?.color,
                )}
              >
                {selectedStatus?.label}
              </div>
            ) : (
              "Select status..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {statuses.map((status) => (
              <CommandItem
                key={status.id}
                value={status.label}
                onSelect={() => {
                  console.log("Selected status:", status.id); // Add this debug log
                  onChange(status.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-sm font-medium",
                      status.bgColor,
                      status.color,
                    )}
                  >
                    {status.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === status.id ? "opacity-100" : "opacity-0",
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
