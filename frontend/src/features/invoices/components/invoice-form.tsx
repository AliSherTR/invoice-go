"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { invoiceSchema, InvoiceValues } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useRef } from "react";

export default function InvoiceForm() {
  const form = useForm<InvoiceValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      senderStreetAddress: "",
      senderCity: "",
      senderPostCode: "",
      senderCountry: "",

      clientName: "",
      clientEmail: "",
      clientCity: "",
      clientCountry: "",
      clientPostCode: "",
      clientStreetAddress: "",

      invoiceDate: new Date(),
      paymentTerms: "NET_1",
      projectDescription: "",
      itemsList: [{ itemName: "", quantity: 0, price: 0 }],
    },
  });
  const submitStatus = useRef<"DRAFT" | "PENDING">("DRAFT");

  const {
    fields: invoiceItems,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "itemsList",
  });

  const onSubmit = (data: InvoiceValues) => {
    console.log({ ...data, status: submitStatus.current });
  };

  return (
    <div className="p-4">
      <form>
        <h3 className="text-sm font-bold mb-3">Bill From</h3>
        <FieldGroup>
          <Controller
            name="senderStreetAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel className="invoice__label">
                  Street Address
                </FieldLabel>
                <Input
                  {...field}
                  className="invoice__input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Street Address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex gap-3 mb-8">
            <div className="flex-1">
              <Controller
                name="senderCity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">City</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="City"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                name="senderPostCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">
                      Post Code
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="Post Code"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                name="senderCountry"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">Country</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="Country"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
        </FieldGroup>

        <h3 className="text-sm font-bold mb-3">Bill To</h3>
        <FieldGroup>
          <Controller
            name="clientName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel className="invoice__label">Client Name</FieldLabel>
                <Input
                  {...field}
                  className="invoice__input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Client Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="clientEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel className="invoice__label">Client Email</FieldLabel>
                <Input
                  {...field}
                  className="invoice__input"
                  aria-invalid={fieldState.invalid}
                  placeholder="john@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="clientStreetAddress"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field aria-invalid={fieldState.invalid}>
                <FieldLabel className="invoice__label">
                  Street Address
                </FieldLabel>
                <Input
                  {...field}
                  className="invoice__input"
                  aria-invalid={fieldState.invalid}
                  placeholder="Street Address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex gap-x-3">
            <div className="flex-1">
              <Controller
                name="clientCity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">City</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="City"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                name="clientPostCode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">
                      Post Code
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="Post Code"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex-1">
              <Controller
                name="clientCountry"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">Country</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="invoice__input"
                      placeholder="Country"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="flex gap-6">
            {/* Invoice Date */}
            <div className="flex-1">
              <Controller
                name="invoiceDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel className="invoice__label">
                      Invoice Date
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-11 justify-start text-left font-normal invoice__input",
                            !field.value && "text-gray-400 dark:text-[#4a5180]",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 dark:bg-[#1a1c2e] dark:border-[#2d3154]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Payment Terms */}
            <div className="flex-1">
              <Controller
                name="paymentTerms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field aria-invalid={fieldState.invalid}>
                    <FieldLabel className="invoice__label">
                      Payment Terms
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-11 invoice__input">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#1a1c2e] dark:border-[#2d3154]">
                        <SelectItem value="NET_1">Net 1 Day</SelectItem>
                        <SelectItem value="NET_7">Net 7 Days</SelectItem>
                        <SelectItem value="NET_14">Net 14 Days</SelectItem>
                        <SelectItem value="NET_30">Net 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <Controller
            name="projectDescription"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className=" input__label">
                  Project Description
                </FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className=" invoice__input"
                  placeholder="Project Description"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className=" mt-5">
          {invoiceItems.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end"
            >
              <Controller
                control={form.control}
                name={`itemsList.${index}.itemName`}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">
                      Item Name
                    </FieldLabel>
                    <Input
                      {...field}
                      className="invoice__input"
                      aria-invalid={fieldState.invalid}
                      placeholder="Item Name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name={`itemsList.${index}.quantity`}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">Qty</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      className="invoice__input"
                      aria-invalid={fieldState.invalid}
                      placeholder="1"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name={`itemsList.${index}.price`}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="invoice__label">Price</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      className="invoice__input"
                      aria-invalid={fieldState.invalid}
                      placeholder="0.00"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="mb-4 text-gray-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={() => append({ itemName: "", quantity: 1, price: 0 })}
          >
            + Add Item
          </Button>
        </FieldGroup>

        <SheetFooter className=" flex justify-between items-center flex-row mt-10">
          <div className=" flex-1">
            <SheetClose asChild>
              <Button
                className=" invoice__button bg-[hsl(233,30%,21%)]"
                onClick={(e) => {
                  form.reset();
                }}
              >
                Discard
              </Button>
            </SheetClose>
          </div>

          <Button
            className="invoice__button bg-[hsl(233,31%,17%)]"
            onClick={(e) => {
              e.preventDefault();
              submitStatus.current = "DRAFT";
              form.handleSubmit(onSubmit);
            }}
          >
            Save As Draft
          </Button>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              submitStatus.current = "PENDING";
              form.handleSubmit(onSubmit)();
            }}
            className="invoice__button bg-[hsl(252,100%,73%)]"
          >
            Save & Send
          </Button>
        </SheetFooter>
      </form>
    </div>
  );
}
