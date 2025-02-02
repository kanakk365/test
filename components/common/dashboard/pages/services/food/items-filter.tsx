import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useFoodStore } from "@/app/hooks/foods";

export default function FilterSection() {
  const { filters, setFilters, items } = useFoodStore();

  const uniqueValues = {
    cuisines: [...new Set(items.map((item) => item.cuisine_id))],
    categories: [...new Set(items.map((item) => item.category))],
    spiceLevels: [...new Set(items.map((item) => item.spice_level))],
    types: [...new Set(items.map((item) => item.type))],
    timings: [...new Set(items.map((item) => item.timing))],
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Filters</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Cuisine</label>
            <Select
              value={filters.cuisine || "all"} // Provide a fallback value
              onValueChange={(value) =>
                setFilters({ cuisine: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                {uniqueValues.cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) =>
                setFilters({ category: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueValues.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.spiceLevel || "all"}
              onValueChange={(value) =>
                setFilters({ spiceLevel: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select spice level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spices</SelectItem>
                {uniqueValues.spiceLevels.map((spiceLevel) => (
                  <SelectItem key={spiceLevel} value={spiceLevel}>
                    {spiceLevel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Type</label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) =>
                setFilters({ type: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueValues.types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Timings</label>
            <Select
              value={filters.timing || "all"}
              onValueChange={(value) =>
                setFilters({ timing: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timings</SelectItem>
                {uniqueValues.timings.map((timing) => (
                  <SelectItem key={timing} value={timing}>
                    {timing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Price Range</label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) =>
                setFilters({ priceRange: value as [number, number] })
              }
              min={0}
              max={1000}
              step={10}
              className="mt-2"
            />
            <div className="mt-1 flex justify-between text-sm">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
