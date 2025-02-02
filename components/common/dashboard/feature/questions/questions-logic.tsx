import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogicBuilderStore } from "@/app/hooks/questions";
import {
  getAllDatabaseTableColumnNames,
  getAllDatabaseTableNames,
} from "@/app/actions/questions";
import { MultiSelectCombobox } from "../multi-select";

// Zod Schema
const logicSchema = z.object({
  name: z.string().min(1, "Name is required"),
  source_table: z.string().min(1, "Source table is required"),
  source_columns: z
    .array(z.string())
    .min(1, "At least one source column is required"),
  option_column: z.string().min(1, "Option column is required"),
  option_id_column: z.string().min(1, "Option ID column is required"),
  question_id: z.string().min(1, "Question is required"),
  logic: z
    .array(
      z.object({
        type: z.string(),
        field: z.string(),
        value: z.string(),
        value_source: z.enum(["token", "constant", "previous-question"]),
      }),
    )
    .min(1, "At least one logic rule is required"),
});

// Helper Components
const InfoTooltip = ({ content }: { content: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-4 h-4 ml-2 text-gray-500 cursor-help" />
      </TooltipTrigger>
      <TooltipContent className="max-w-sm">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Main Component
const LogicBuilderDialog = () => {
  const { isOpen, setOpen, selectedQuestion } = useLogicBuilderStore();
  const [tables, setTables] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof logicSchema>>({
    resolver: zodResolver(logicSchema),
    defaultValues: {
      name: "",
      source_table: "",
      source_columns: [],
      option_column: "",
      option_id_column: "",
      question_id: selectedQuestion || "",
      logic: [
        {
          type: "=",
          field: "",
          value: "",
          value_source: "constant",
        },
      ],
    },
  });

  // Fetch tables on component mount
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const dbTables = await getAllDatabaseTableNames();
        setTables(dbTables || []); // Ensure we set an empty array if null
      } catch (error) {
        console.error("Failed to fetch tables:", error);
        setTables([]);
      }
    };
    fetchTables();
  }, []);

  // Fetch columns when table is selected
  useEffect(() => {
    const fetchColumns = async () => {
      const selectedTable = form.watch("source_table");
      if (!selectedTable) {
        setColumns([]);
        return;
      }

      setLoading(true);
      try {
        const tableColumns =
          await getAllDatabaseTableColumnNames(selectedTable);
        setColumns(tableColumns || []); // Ensure we set an empty array if null
      } catch (error) {
        console.error("Failed to fetch columns:", error);
        setColumns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchColumns();
  }, [form.watch("source_table")]);

  const onSubmit = (values: z.infer<typeof logicSchema>) => {
    console.log(values);
    setOpen(false);
  };

  const addLogicRule = () => {
    const currentLogic = form.getValues("logic");
    form.setValue("logic", [
      ...currentLogic,
      {
        type: "=",
        field: "",
        value: "",
        value_source: "constant",
      },
    ]);
  };

  const removeLogicRule = (index: number) => {
    const currentLogic = form.getValues("logic");
    form.setValue(
      "logic",
      currentLogic.filter((_, i) => i !== index),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Logic to Question</DialogTitle>
          <DialogDescription>
            Configure how options should be dynamically generated for this
            question based on specific conditions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                console.log("field.value:", field.value);
                const safeValue = Array.isArray(field.value) ? field.value : [];
                console.log("safeValue:", safeValue);
                return (
                  <FormItem>
                    <FormLabel>Friendly Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Filter Vegetarian Items"
                      />
                    </FormControl>
                    <FormDescription className="flex items-center">
                      A descriptive name for this logic configuration
                      <InfoTooltip content="This name helps identify the purpose of this logic in the admin panel" />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source_table"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Table</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Reset columns when table changes
                        form.setValue("source_columns", []);
                        form.setValue("option_column", "");
                        form.setValue("option_id_column", "");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem key={table} value={table}>
                            {table}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="flex items-center">
                      The table to query data from
                      <InfoTooltip content="This is the database table that contains the options you want to show to users" />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source_columns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Column(s)</FormLabel>
                    <FormControl>
                      <MultiSelectCombobox
                        options={columns}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={loading ? "Loading..." : "Select columns"}
                        isLoading={loading}
                      />
                    </FormControl>
                    <FormDescription className="flex items-center">
                      Columns to select from the table
                      <InfoTooltip content="Select one or more columns to query from the table" />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="option_column"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option Display Column</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="flex items-center">
                      Column shown to users
                      <InfoTooltip content="This is the value that will be displayed to users in the dropdown/selection" />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option_id_column"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option ID Column</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        {columns.map((column) => (
                          <SelectItem key={column} value={column}>
                            {column}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="flex items-center">
                      Column saved as answer
                      <InfoTooltip content="This value will be saved in the database as the user's answer" />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Logic Rules</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLogicRule}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Rule
                </Button>
              </div>

              <AnimatePresence>
                {form.watch("logic").map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 border rounded-lg space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Rule {index + 1}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLogicRule(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`logic.${index}.field`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {columns.map((column) => (
                                  <SelectItem key={column} value={column}>
                                    {column}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`logic.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operator</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="=">=</SelectItem>
                                <SelectItem value="!=">!=</SelectItem>
                                <SelectItem value=">">{">"}</SelectItem>
                                <SelectItem value="<">{"<"}</SelectItem>
                                <SelectItem value=">=">{"≥"}</SelectItem>
                                <SelectItem value="<=">{"≤"}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`logic.${index}.value_source`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Value Source</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="constant">
                                  Constant
                                </SelectItem>
                                <SelectItem value="token">Token</SelectItem>
                                <SelectItem value="previous-question">
                                  Previous Question
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`logic.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter value" />
                          </FormControl>
                          <FormDescription className="flex items-center">
                            {form.watch(`logic.${index}.value_source`) ===
                              "constant" && "Enter a fixed value"}
                            {form.watch(`logic.${index}.value_source`) ===
                              "token" && "Enter a token (e.g., region)"}
                            {form.watch(`logic.${index}.value_source`) ===
                              "previous-question" && "Enter a question ID"}
                            <InfoTooltip
                              content={
                                form.watch(`logic.${index}.value_source`) ===
                                "constant"
                                  ? "A fixed value to compare against"
                                  : form.watch(
                                        `logic.${index}.value_source`,
                                      ) === "token"
                                    ? "System tokens like 'region' that are available in the context"
                                    : "ID of a previous question whose answer should be used"
                              }
                            />
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <DialogFooter>
              <Button type="submit">Save Logic</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LogicBuilderDialog;
