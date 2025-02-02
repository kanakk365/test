import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormStore } from "@/app/hooks/providers";
import { useState } from "react";
import { uploadFile } from "@/app/actions/uploads";
import { ServiceCombobox } from "../feature/service-selector";
import { createProvider } from "@/app/actions/providers";
import { RegionCombobox } from "../feature/select-region";

const formSchema = z.object({
  id: z.string().default(""),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  logo_image: z.string().url("Invalid URL"),
  banner_image: z.string().url("Invalid URL"),
  address: z.string().min(10, "Address is too short"),
  legal_name: z.string().min(2, "Legal name is too short"),
  regions_available: z.array(z.string()),
  legal_documents: z.array(z.string()),
  policies: z.object({
    cancellation: z.number().min(0),
    advance_booking: z.number().min(0),
    advance_payment: z.number().min(0),
    refund: z.boolean(),
  }),
  service_id: z.string().min(1, "Please select a service"),
});

export function ServiceProviderForm() {
  const { formData, setFormData } = useFormStore();
  const [isUploading, setIsUploading] = useState({
    logo: false,
    banner: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const handleFileUpload = async (
    file: File | null,
    type: "logo" | "banner",
  ) => {
    if (!file) return;

    try {
      setIsUploading((prev) => ({ ...prev, [type]: true }));
      const url = await uploadFile(file);

      if (url) {
        if (type === "logo") {
          form.setValue("logo_image", url);
        } else {
          form.setValue("banner_image", url);
        }
        toast.success(
          `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
        );
      }
    } catch {
      toast.error(`Failed to upload ${type}`);
    } finally {
      setIsUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormData(values);
      await createProvider(values);
      toast.success("Form submitted successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileUpload(file, "logo");
                      }}
                      disabled={isUploading.logo}
                    />
                    {isUploading.logo && (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-500">
                          Uploading logo...
                        </span>
                      </div>
                    )}
                    {field.value && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <img
                          src={field.value}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="banner_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileUpload(file, "banner");
                      }}
                      disabled={isUploading.banner}
                    />
                    {isUploading.banner && (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-gray-500">
                          Uploading banner...
                        </span>
                      </div>
                    )}
                    {field.value && (
                      <div className="relative w-full h-40 rounded-lg overflow-hidden">
                        <img
                          src={field.value}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="service_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Service Type</FormLabel>
                <FormControl>
                  <ServiceCombobox
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
            name="regions_available"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select Region</FormLabel>
                <FormControl>
                  <RegionCombobox
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
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legal_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter legal name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="policies.cancellation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancellation Period (hours)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policies.advance_booking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advance Booking (days)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policies.advance_payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Advance Payment (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="policies.refund"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Allow Refunds</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isUploading.logo || isUploading.banner}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
