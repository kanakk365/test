import { useEffect } from "react";
import ItemCard from "./item-card";
import FilterSection from "./items-filter";
import { useFoodStore } from "@/app/hooks/foods";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/app/hooks/dashboard";

export default function FoodItemsListPage() {
  const { filteredItems, getItems } = useFoodStore();
  const { setActive } = useDashboard();

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-black">Food Items</h1>
        <Button
          className="my-4"
          variant="secondary"
          onClick={() => setActive("create-food-item")}
        >
          Add Food Item
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <FilterSection />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
