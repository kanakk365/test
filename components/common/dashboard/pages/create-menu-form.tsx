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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MenuItem, useMenuStore } from "@/app/hooks/menu";
import { ProviderCombobox } from "../feature/select-provider";
import { RestaurantCombobox } from "../feature/select-restaurant";
import { MenuItemCombobox } from "../feature/select-item";
import { createMenu } from "@/app/actions/menus";
import { getAllRestraunts } from "@/app/actions/restaurants";
import { getAllItems } from "@/app/actions/items";

const menuSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  provider_id: z.string().min(3, "Provider is required"),
  restaurant_id: z.string().min(3, "Restaurant is required"),
  type: z.string().min(2, "Type is required"),
});

export function CreateMenuForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const {
    menuData,
    resetForm,
    setAvailableItems,
    setRestaurants,
    availableItems,
  } = useMenuStore();
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: menuData.name || "",
      description: menuData.description || "",
      provider_id: menuData.provider_id || "",
      restaurant_id: menuData.restaurant_id || "",
      type: menuData.type || "",
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [restaurants, items] = await Promise.all([
          getAllRestraunts(),
          getAllItems(),
        ]);

        if (restaurants) setRestaurants(restaurants);
        if (items) setAvailableItems(items);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, [setRestaurants, setAvailableItems]);

  const handleSubmit = async (formData: z.infer<typeof menuSchema>) => {
    if (selectedItems.length === 0) {
      toast.error("Please add at least one menu item");
      return;
    }

    setIsLoading(true);
    try {
      const menuPayload = {
        id: "",
        ...formData,
        is_active: true,
        // Filter out any undefined values and ensure all items are strings
        items: selectedItems
          .map((item) => item.id)
          .filter((id): id is string => id !== undefined && id !== ""),
      };

      const result = await createMenu(menuPayload);

      if (result) {
        toast.success("Menu created successfully");
        resetFormState();
      } else {
        console.log("Failed to create menu");
        console.log(result);
      }
    } catch (error) {
      console.error("Create menu error:", error);
      toast.error("An error occurred while creating the menu");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormState = () => {
    form.reset({
      name: "",
      description: "",
      provider_id: "",
      restaurant_id: "",
      type: "",
    });
    setSelectedItems([]);
    resetForm();
  };

  const addMenuItem = () => {
    const availableItemsCount = availableItems.filter(
      (item) => !selectedItems.some((selected) => selected.id === item.id),
    ).length;

    if (availableItemsCount === 0) {
      toast.warning("No more items available to add");
      return;
    }

    setSelectedItems([
      ...selectedItems,
      {
        id: "",
        cuisine_id: "",
        name: "",
        description: "",
        price: 0,
        images: [],
        type: "",
        category: "",
        spice_level: "",
        ingredients: [],
        timing: "",
        tags: [],
        region: "",
      },
    ]);
  };

  const updateMenuItem = (index: number, item: MenuItem) => {
    if (
      selectedItems.some(
        (existing, i) => i !== index && existing.id === item.id,
      )
    ) {
      toast.error("This item is already added to the menu");
      return;
    }

    const updatedItems = [...selectedItems];
    updatedItems[index] = item;
    setSelectedItems(updatedItems);
  };

  const removeMenuItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center h-48">Loading...</div>
    );
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Create New Menu</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
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
                  <FormLabel>Menu Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu type" {...field} />
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
                    placeholder="Enter menu description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="provider_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
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

            <FormField
              control={form.control}
              name="restaurant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant</FormLabel>
                  <FormControl>
                    <RestaurantCombobox
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Menu Items</h3>
              <Button
                type="button"
                variant="outline"
                onClick={addMenuItem}
                disabled={isLoading}
              >
                Add Item
              </Button>
            </div>

            {selectedItems.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMenuItem(index)}
                      disabled={isLoading}
                    >
                      Remove
                    </Button>
                  </div>

                  <MenuItemCombobox
                    value={item}
                    onChange={(selected) => updateMenuItem(index, selected)}
                  />

                  {item.name && (
                    <div className="text-sm space-y-1 mt-2">
                      <p>
                        <strong>Price:</strong> ${item.price}
                      </p>
                      <p>
                        <strong>Category:</strong> {item.category}
                      </p>
                      <p>
                        <strong>Description:</strong> {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Creating..." : "Create Menu"}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
