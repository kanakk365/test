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

interface ProviderComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProviderCombobox({ value, onChange }: ProviderComboboxProps) {
  const [open, setOpen] = useState(false);
  const { providers, getProviders } = useDashboard();

  useEffect(() => {
    if (!providers.length) {
      getProviders();
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
                {providers.find((provider) => provider.id === value)
                  ?.logo_image && (
                  <div className="relative w-6 h-6">
                    <Image
                      src={
                        providers.find((provider) => provider.id === value)
                          ?.logo_image || ""
                      }
                      alt="provider icon"
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                )}
                {
                  providers.find((provider) => provider.id === value)
                    ?.legal_name
                }
              </>
            ) : (
              "Select a provider..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search providers..." />
          <CommandEmpty>No provider found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {providers.map((provider) => (
              <CommandItem
                key={provider.id}
                value={provider.legal_name}
                onSelect={() => {
                  onChange(provider.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="relative w-6 h-6">
                    <Image
                      src={
                        provider.logo_image ||
                        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/30/57/59/altitude-rooftop-outside.jpg?w=600&h=-1&s=1"
                      }
                      alt={provider.legal_name}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  {provider.legal_name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === provider.id ? "opacity-100" : "opacity-0",
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
