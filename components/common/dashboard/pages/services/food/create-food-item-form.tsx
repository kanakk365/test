import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useFoodStore } from "@/app/hooks/foods";
import { uploadFile } from "@/app/actions/uploads";
import { CuisineSingleCombobox } from "../../../feature/select-cuisine-single";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // price: z.coerce.number().min(0, "Price must be positive"),
  spice_level: z.enum(["high", "medium", "low"]),
  category: z.enum(["main", "dessert", "drink", "other"]),
  type: z.enum(["vegetarian", "non-vegetarian"]),
  timing: z.array(z.string()).min(1, "Select at least one timing"),
  cuisine_id: z.string().min(1, "Cuisine is required"),
  ingredients: z
    .string()
    .transform((str) => str.split(",").map((s) => s.trim())),
  standard_serving_quantity: z.coerce
    .number()
    .min(1, "Quantity must be at least 1"),
  standard_serving_unit: z.enum(["grams", "milliliters", "pieces", "other"]),
  standard_serving_price: z.coerce.number().min(0, "Price must be positive"),
  images: z.array(z.string()),
  // tags: z.string().transform((str) => str.split(",").map((s) => s.trim())),
});

export default function CreateFoodItemPageForm() {
  const { createItem } = useFoodStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timing: [],
      images: [],
      type: "vegetarian",
      spice_level: "medium",
      standard_serving_unit: "pieces",
    },
  });

  const timingOptions = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newItem = {
        ...values,
        id: crypto.randomUUID(),
        region: "akbkasdj69",
        timing: values.timing.join(","),
        price: 0,
        tags: [],
      };
      console.log(newItem);
      createItem(newItem);
      toast.success("Food item created successfully!");
      // form.reset();
    } catch {
      toast.error("Failed to create food item");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadFile(file);
        if (imageUrl) {
          const currentImages = form.getValues("images");
          form.setValue("images", [...currentImages, imageUrl]);
          toast.success("Image uploaded successfully");
        }
      } catch {
        toast.error("Failed to upload image");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Food Item
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="text-gray-800" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="text-gray-800" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Ingredients (comma-separated)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="text-gray-800" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Classification */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="spice_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Spice Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-gray-800">
                          <SelectValue placeholder="Select spice level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-gray-800">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="main">Main</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="drink">Drink</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuisine_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Cuisine</FormLabel>
                    <FormControl>
                      <CuisineSingleCombobox
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Serving Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="standard_serving_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Serving Quantity
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="text-gray-800" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="standard_serving_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Serving Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-gray-800">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="grams">Grams</SelectItem>
                      <SelectItem value="milliliters">Milliliters</SelectItem>
                      <SelectItem value="pieces">Pieces</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="standard_serving_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Serving Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" className="text-gray-800" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Type and Timing */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormLabel className="text-gray-700">Vegetarian</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === "vegetarian"}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked ? "vegetarian" : "non-vegetarian",
                        )
                      }
                    />
                  </FormControl>
                  <span className="text-gray-600">
                    {field.value === "vegetarian"
                      ? "Vegetarian"
                      : "Non-vegetarian"}
                  </span>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timing"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-700">Timing</FormLabel>
                  <div className="flex space-x-4">
                    {timingOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="timing"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, option.id]
                                    : field.value.filter(
                                        (val) => val !== option.id,
                                      );
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-gray-600">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <FormLabel className="text-gray-700">Images</FormLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-gray-800"
            />
            {form.getValues("images").length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.getValues("images").map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt=""
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      onClick={() => {
                        const currentImages = form.getValues("images");
                        form.setValue(
                          "images",
                          currentImages.filter((_, i) => i !== index),
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Item
          </Button>
        </form>
      </Form>
    </div>
  );
}
