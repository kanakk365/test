import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { DaySlot, Slot } from "@/app/hooks/venues";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface SlotManagerProps {
  value: DaySlot[];
  onChange: (slots: DaySlot[]) => void;
}

export function SlotManager({ value, onChange }: SlotManagerProps) {
  const [selectedDay, setSelectedDay] = useState<string>(WEEKDAYS[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const addSlot = () => {
    const newSlot: Slot = {
      start_time: startTime,
      end_time: endTime,
    };

    const updatedSlots = [...value];
    const dayIndex = updatedSlots.findIndex(
      (day) => day.week_day === selectedDay,
    );

    if (dayIndex === -1) {
      updatedSlots.push({
        week_day: selectedDay,
        slots: [newSlot],
      });
    } else {
      updatedSlots[dayIndex].slots.push(newSlot);
    }

    onChange(updatedSlots);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedSlots = [...value];
    updatedSlots[dayIndex].slots.splice(slotIndex, 1);

    // Remove the day if no slots remain
    if (updatedSlots[dayIndex].slots.length === 0) {
      updatedSlots.splice(dayIndex, 1);
    }

    onChange(updatedSlots);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger>
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            {WEEKDAYS.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full"
        />

        <Input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full"
        />

        <Button onClick={addSlot} type="button">
          Add Slot
        </Button>
      </div>

      <div className="space-y-4">
        {value.map((day, dayIndex) => (
          <div key={day.week_day} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">{day.week_day}</h3>
            <div className="space-y-2">
              {day.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="flex items-center gap-2">
                  <span className="flex-1">
                    {slot.start_time} - {slot.end_time}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSlot(dayIndex, slotIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
