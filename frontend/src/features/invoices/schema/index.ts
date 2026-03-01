import z from "zod";

export const invoiceItemSchema = z
  .object({
    itemName: z
      .string()
      .min(1, "Item name is required")
      .max(100, "Item name must be under 100 characters"),
    quantity: z
      .number({ error: "Quantity must be a number" })
      .int("Quantity must be a whole number")
      .positive("Quantity must be at least 1"),
    price: z
      .number({ error: "Price must be a number" })
      .nonnegative("Price cannot be negative")
      .multipleOf(0.01, "Price can have at most 2 decimal places"),
  })
  .refine(
    (data) => {
      if (data.price <= 0) {
        return false;
      }
      return true;
    },
    {
      error: "Price must be greater than zero",
      path: ["price"],
    },
  );

export const invoiceSchema = z.object({
  // Sender
  senderStreetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(100, "Street address must be under 100 characters"),
  senderCity: z
    .string()
    .min(1, "City is required")
    .max(50, "City must be under 50 characters"),
  senderPostCode: z
    .string()
    .min(1, "Post code is required")
    .max(10, "Post code must be under 10 characters"),
  senderCountry: z
    .string()
    .min(1, "Country is required")
    .max(50, "Country must be under 50 characters"),

  // Client
  clientName: z
    .string()
    .min(1, "Client name is required")
    .max(100, "Client name must be under 100 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientStreetAddress: z
    .string()
    .min(1, "Client street address is required")
    .max(100, "Street address must be under 100 characters"),
  clientCity: z
    .string()
    .min(1, "Client city is required")
    .max(50, "City must be under 50 characters"),
  clientPostCode: z
    .string()
    .min(1, "Client post code is required")
    .max(10, "Post code must be under 10 characters"),
  clientCountry: z
    .string()
    .min(1, "Client country is required")
    .max(50, "Country must be under 50 characters"),

  // Invoice details
  invoiceDate: z.date({ error: "Invoice date is required" }),
  paymentTerms: z.enum(["NET_1", "NET_7", "NET_14", "NET_30"], {
    message: "Please select a valid payment term",
  }),
  projectDescription: z
    .string()
    .min(1, "Project description is required")
    .max(500, "Description must be under 500 characters"),

  // Items
  itemsList: z.array(invoiceItemSchema).min(1, "At least one item is required"),
});

export type InvoiceValues = z.infer<typeof invoiceSchema>;
